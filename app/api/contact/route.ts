import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { checkRateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

/** How long to wait for Resend/Formspree before giving up on the request. */
const UPSTREAM_TIMEOUT_MS = 5_000;

/** Max emails accepted from one IP in the window below. */
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

const MAX_DETAIL_LENGTH = 300;

type Payload = Record<string, unknown>;

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for') ?? '';
  const ip =
    forwarded.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown';

  // Hash the IP so we never retain raw addresses in memory/Redis keys.
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

function rateLimitKey(scope: string, key: string): string {
  return `ratelimit:${scope}:${key}`;
}

function resolveIdempotencyKey(provided: unknown, fingerprint: string): string {
  if (typeof provided === 'string' && /^[A-Za-z0-9_-]{8,100}$/.test(provided)) {
    return provided;
  }
  return `auto-${createHash('sha256').update(fingerprint).digest('hex').slice(0, 32)}`;
}

async function readErrorDetail(res: Response): Promise<string> {
  const text = await res.text().catch(() => '');
  return text.slice(0, MAX_DETAIL_LENGTH) || res.statusText || 'no detail';
}

function isTimeout(error: unknown): boolean {
  return error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
}

export async function POST(request: Request) {
  const ipKey = clientKey(request);

  const limit = await checkRateLimit(rateLimitKey('contact', ipKey), RATE_LIMIT);
  if (!limit.ok) {
    console.warn('[contact] rate limited', { ipKey });
    return NextResponse.json(
      { error: 'Too many messages. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(limit.retryAfterSeconds),
          'X-RateLimit-Limit': String(limit.limit),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.warn('[contact] invalid JSON body', { ipKey });
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const payload: Payload = typeof body === 'object' && body !== null ? (body as Payload) : {};

  // Honeypot: real users never fill this hidden field.
  if (typeof payload.company === 'string' && payload.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim().slice(0, 200) : '';
  const email = typeof payload.email === 'string' ? payload.email.trim().slice(0, 200) : '';
  const message = typeof payload.message === 'string' ? payload.message.trim().slice(0, 5000) : '';

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const idempotencyKey = resolveIdempotencyKey(
    payload.idempotencyKey,
    `${ipKey}:${name}:${email}:${message}`
  );

  const endpoint = process.env.CONTACT_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `[Portfolio] ${name}`,
        }),
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (!res.ok) {
        const detail = await readErrorDetail(res);
        console.error('[contact] endpoint delivery failed', {
          status: res.status,
          detail,
          ipKey,
        });
        return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
      }
    } catch (error) {
      if (isTimeout(error)) {
        console.error('[contact] endpoint timed out', { ipKey });
        return NextResponse.json({ error: 'Delivery timed out' }, { status: 504 });
      }
      throw error;
    }

    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.error('[contact] delivery not configured', {
      hasResendKey: Boolean(apiKey),
      hasContactEmail: Boolean(to),
    });
    return NextResponse.json({ error: 'Contact delivery is not configured' }, { status: 501 });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to,
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    // A replayed idempotency key means the original request already succeeded.
    if (!res.ok && res.status !== 409) {
      const detail = await readErrorDetail(res);
      console.error('[contact] resend rejected message', {
        status: res.status,
        detail,
        ipKey,
      });
      return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
    }

    const result = (await res.json().catch(() => null)) as { id?: string } | null;
    // eslint-disable-next-line no-console -- keep a delivery trace with the Resend id
    console.info('[contact] message accepted', {
      resendId: result?.id ?? null,
      duplicate: res.status === 409,
      ipKey,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (isTimeout(error)) {
      console.error('[contact] resend timed out', { ipKey });
      return NextResponse.json({ error: 'Delivery timed out' }, { status: 504 });
    }

    console.error('[contact] resend request crashed', {
      error: error instanceof Error ? error.name : 'unknown',
      ipKey,
    });
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}