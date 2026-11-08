export type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

type Entry = { count: number; resetAt: number };

const memory = new Map<string, Entry>();
const MAX_MEMORY_ENTRIES = 5_000;

function pruneMemory(now: number) {
  for (const [key, entry] of memory) {
    if (entry.resetAt <= now) memory.delete(key);
  }
  if (memory.size > MAX_MEMORY_ENTRIES) {
    const excess = memory.size - MAX_MEMORY_ENTRIES;
    let dropped = 0;
    for (const key of memory.keys()) {
      memory.delete(key);
      if (++dropped >= excess) break;
    }
  }
}

function memoryLimit(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();

  if (memory.size > MAX_MEMORY_ENTRIES) pruneMemory(now);

  const entry = memory.get(key);

  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, limit, remaining: limit - 1, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  entry.count += 1;

  return {
    ok: entry.count <= limit,
    limit,
    remaining: Math.max(0, limit - entry.count),
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
  };
}

type PipelineResult = { result: number | string | null; error?: string };

async function redisLimit(key: string, { limit, windowMs }: RateLimitOptions): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url.replace(/\/+$/, '')}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['PEXPIRE', key, windowMs, 'NX'],
        ['PTTL', key],
      ]),
      signal: AbortSignal.timeout(1500),
    });

    if (!res.ok) {
      console.warn('[rate-limit] redis request failed', { status: res.status });
      return null;
    }

    const data = (await res.json()) as PipelineResult[];
    const count = Number(data?.[0]?.result);
    if (data?.[0]?.error || !Number.isFinite(count)) {
      console.warn('[rate-limit] unexpected redis response');
      return null;
    }

    const ttl = Number(data?.[2]?.result);
    const retryAfterSeconds =
      Number.isFinite(ttl) && ttl > 0 ? Math.ceil(ttl / 1000) : Math.ceil(windowMs / 1000);

    return { ok: count <= limit, limit, remaining: Math.max(0, limit - count), retryAfterSeconds };
  } catch (error) {
    console.warn('[rate-limit] redis unavailable, using memory', { error: (error as Error).name });
    return null;
  }
}

export async function checkRateLimit(key: string, options: RateLimitOptions): Promise<RateLimitResult> {
  return (await redisLimit(key, options)) ?? memoryLimit(key, options);
}
