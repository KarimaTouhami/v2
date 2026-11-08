import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/** Cache the upstream response for an hour; contributions change a few times a day at most. */
export const revalidate = 3600;

const UPSTREAM = 'https://github-contributions-api.jogruber.de/v4';
const USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
const UPSTREAM_TIMEOUT_MS = 8_000;
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

type Contribution = {
  date: string;
  count: number;
  level: number;
};

function isContribution(value: unknown): value is Contribution {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.date === 'string' &&
    typeof entry.count === 'number' &&
    typeof entry.level === 'number'
  );
}

async function fetchContributions(username: string) {
  const response = await fetch(`${UPSTREAM}/${encodeURIComponent(username)}?y=last`, {
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Upstream responded with ${response.status}`);
  }

  const result = (await response.json()) as { contributions?: unknown };
  const contributions = Array.isArray(result.contributions)
    ? result.contributions.filter(isContribution)
    : [];

  if (contributions.length === 0) {
    throw new Error('Upstream returned no contribution data');
  }

  return contributions;
}

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get('username')?.trim() ?? '';

  if (!USERNAME_PATTERN.test(username)) {
    return NextResponse.json({ error: 'Invalid GitHub username' }, { status: 400 });
  }

  try {
    const contributions = await fetchContributions(username);
    return NextResponse.json(
      { contributions },
      { headers: CACHE_HEADERS }
    );
  } catch (error) {
    // One retry covers transient upstream failures and rate limiting.
    try {
      const contributions = await fetchContributions(username);
      return NextResponse.json(
        { contributions },
        { headers: CACHE_HEADERS }
      );
    } catch {
      console.error('[github-contributions] upstream failed', {
        username,
        error: error instanceof Error ? error.message : 'unknown',
      });
      return NextResponse.json(
        { error: 'Unable to load GitHub activity' },
        { status: 502, headers: { 'Cache-Control': 'no-store' } }
      );
    }
  }
}
