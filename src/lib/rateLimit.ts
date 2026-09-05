/**
 * Client-IP resolution and a small in-process IP rate limiter.
 *
 * IMPORTANT SERVERLESS CAVEAT
 * ---------------------------
 * On Vercel and Netlify these routes run as serverless functions, and module
 * state does NOT reliably persist between invocations.
 *
 * Measured against the real Netlify Functions runtime (`netlify serve`): 28
 * consecutive requests with a constant client IP never triggered a 429, while
 * the same code under `next start` limits on the 5th. Treat this limiter as
 * providing NO protection on Netlify, and at best a per-instance speed bump
 * elsewhere.
 *
 * Real protection must be configured at the platform edge:
 *   - Vercel:  Firewall / WAF rate-limiting rules on the route, or @upstash/ratelimit.
 *   - Netlify: Rate limiting on the function, or an equivalent shared store.
 *
 * Only headers written by a trusted platform edge are consulted. `x-forwarded-for`
 * is deliberately NOT trusted on its own because any client can send it; it is
 * used only when the platform is known to overwrite it.
 */

type ClientIpHeader =
  | "cf-connecting-ip" // Cloudflare
  | "x-nf-client-connection-ip" // Netlify
  | "x-vercel-forwarded-for"; // Vercel

const TRUSTED_IP_HEADERS: ClientIpHeader[] = [
  "cf-connecting-ip",
  "x-nf-client-connection-ip",
  "x-vercel-forwarded-for",
];

function firstValue(raw: string | null) {
  const value = raw?.split(",")[0]?.trim();
  return value ? value : null;
}

/**
 * Returns the client IP as reported by a trusted platform edge, or null when no
 * such header is present (local development, or an unrecognised host). Callers
 * must treat null as "per-IP limiting unavailable" rather than as a single
 * shared bucket, because one shared bucket lets any client exhaust the quota
 * for everyone.
 */
export function resolveClientIp(request: Request): string | null {
  for (const header of TRUSTED_IP_HEADERS) {
    const value = firstValue(request.headers.get(header));
    if (value) return value;
  }

  // Vercel and Netlify both overwrite x-forwarded-for at the edge, so it is
  // trustworthy on those platforms only.
  if (process.env.VERCEL || process.env.NETLIFY) {
    return firstValue(request.headers.get("x-forwarded-for"));
  }

  return null;
}

export function createIpRateLimiter({
  limit,
  windowMs,
  maxBuckets = 5_000,
}: {
  limit: number;
  windowMs: number;
  maxBuckets?: number;
}) {
  const buckets = new Map<string, number[]>();

  return function isRateLimited(request: Request): boolean {
    const key = resolveClientIp(request);
    // No trusted edge header: fall through to platform-level protection rather
        // than collapsing every caller into one bucket.
    if (!key) return false;

    const now = Date.now();

    // Drop buckets whose entries have all aged out.
    for (const [bucketKey, timestamps] of buckets) {
      if (!timestamps.some((timestamp) => now - timestamp < windowMs)) {
        buckets.delete(bucketKey);
      }
    }

    // Bound memory in a long-lived warm instance.
    if (!buckets.has(key) && buckets.size >= maxBuckets) {
      const oldestKey = buckets.keys().next().value as string | undefined;
      if (oldestKey) buckets.delete(oldestKey);
    }

    const recent = (buckets.get(key) || []).filter(
      (timestamp) => now - timestamp < windowMs,
    );
    recent.push(now);
    buckets.set(key, recent);
    return recent.length > limit;
  };
}
