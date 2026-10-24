/**
 * Production-ready Rate Limiter for Vercel Serverless Functions.
 *
 * Supports:
 * 1. Persistent, multi-instance rate limiting via Upstash Redis REST API or Vercel KV REST API
 *    when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL and KV_REST_API_TOKEN) are set.
 * 2. In-memory sliding-window fallback for local development, CI runs, and single-instance environments.
 *
 * Returns 429 Too Many Requests with Retry-After header when exceeded.
 */

export interface RateLimitOptions {
  maxRequests?: number;
  windowSeconds?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  totalLimit: number;
}

interface MemoryEntry {
  timestamps: number[];
}

const memoryStore = new Map<string, MemoryEntry>();

export function extractClientIp(req: any): string {
  if (!req) return '127.0.0.1';

  const vercelForwarded = req.headers?.['x-vercel-forwarded-for'];
  if (typeof vercelForwarded === 'string' && vercelForwarded.trim()) {
    return vercelForwarded.split(',')[0].trim();
  }

  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = req.headers?.['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }

  const socketIp = req.socket?.remoteAddress;
  if (typeof socketIp === 'string' && socketIp.trim()) {
    return socketIp.trim();
  }

  return '127.0.0.1';
}

function checkMemoryLimit(key: string, maxRequests: number, windowSeconds: number): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const cutoff = now - windowMs;

  let entry = memoryStore.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    memoryStore.set(key, entry);
  }

  // Prune expired timestamps
  entry.timestamps = entry.timestamps.filter((ts) => ts > cutoff);

  if (entry.timestamps.length >= maxRequests) {
    const oldestTimestamp = entry.timestamps[0];
    const retryAfterMs = Math.max(1000, oldestTimestamp + windowMs - now);
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);

    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
      totalLimit: maxRequests,
    };
  }

  entry.timestamps.push(now);
  const remaining = Math.max(0, maxRequests - entry.timestamps.length);

  return {
    allowed: true,
    remaining,
    retryAfterSeconds: 0,
    totalLimit: maxRequests,
  };
}

async function checkRemoteRedisLimit(
  url: string,
  token: string,
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<RateLimitResult | null> {
  try {
    const cleanUrl = url.replace(/\/+$/, '');
    // Upstash pipeline: INCR key, then EXPIRE key windowSeconds (if new)
    const pipelineUrl = `${cleanUrl}/pipeline`;
    const response = await fetch(pipelineUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['TTL', key],
      ]),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!Array.isArray(data) || data.length < 2) return null;

    const count = Number(data[0]?.result);
    let ttl = Number(data[1]?.result);

    // If key had no TTL (e.g. freshly created with INCR), set its expiration
    if (ttl <= 0) {
      fetch(`${cleanUrl}/expire/${encodeURIComponent(key)}/${windowSeconds}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
      ttl = windowSeconds;
    }

    if (count > maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(1, ttl),
        totalLimit: maxRequests,
      };
    }

    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - count),
      retryAfterSeconds: 0,
      totalLimit: maxRequests,
    };
  } catch {
    // If Redis call fails, fall back to in-memory gracefully
    return null;
  }
}

export async function checkRateLimit(
  req: any,
  action: 'contact' | 'newsletter',
  options?: RateLimitOptions
): Promise<RateLimitResult> {
  const maxRequests = options?.maxRequests ?? 5;
  const windowSeconds = options?.windowSeconds ?? 600; // 10 minutes default
  const ip = extractClientIp(req);
  const key = `rl:${action}:${ip}`;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (redisUrl && redisToken) {
    const remoteResult = await checkRemoteRedisLimit(
      redisUrl,
      redisToken,
      key,
      maxRequests,
      windowSeconds
    );
    if (remoteResult) return remoteResult;
  }

  return checkMemoryLimit(key, maxRequests, windowSeconds);
}

/**
 * Express / Vercel Serverless Function helper to enforce rate limiting.
 * Returns false if rate limit exceeded (and sends 429 response).
 */
export async function enforceRateLimit(
  req: any,
  res: any,
  action: 'contact' | 'newsletter',
  options?: RateLimitOptions
): Promise<boolean> {
  const result = await checkRateLimit(req, action, options);

  res.setHeader('X-RateLimit-Limit', String(result.totalLimit));
  res.setHeader('X-RateLimit-Remaining', String(result.remaining));

  if (!result.allowed) {
    res.setHeader('Retry-After', String(result.retryAfterSeconds));
    res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfterSeconds: result.retryAfterSeconds,
    });
    return false;
  }

  return true;
}

// Export for unit tests
export function _resetMemoryStore(): void {
  memoryStore.clear();
}
