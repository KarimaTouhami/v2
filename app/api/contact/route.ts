import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body.company === 'string' && body.company.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 200) : '';
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : '';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const endpoint = process.env.CONTACT_ENDPOINT;
    if (endpoint) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `[Portfolio] ${name}`,
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    if (apiKey && to) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio <onboarding@resend.dev>',
          to,
          reply_to: email,
          subject: `New portfolio message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: 'Contact delivery is not configured' },
      { status: 501 }
    );
  } catch {
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}