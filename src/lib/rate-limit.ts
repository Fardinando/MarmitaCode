import 'server-only';

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/**
 * Rate limit em memória por chave. Suficiente para single-region Vercel.
 * Em multi-region/high-scale, trocar por Redis/Upstash.
 */
export function rateLimit(key: string, max: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  if (b.count >= max) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function cleanupRateLimit() {
  const now = Date.now();
  for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
}

/**
 * Limites por rota. Cada chave é "<rota>:<ip>".
 * Valores conservadores pra evitar abuso sem bloquear usuário real.
 */
export const RATE_LIMITS = {
  orders: { max: 3, windowMs: 60_000 }, // 3 pedidos/min por IP
  briefing: { max: 10, windowMs: 60_000 }, // 10 saves/min
  webhook: { max: 100, windowMs: 60_000 }, // webhook externo tolerância maior
  auth: { max: 10, windowMs: 300_000 }, // 10 login tentativas / 5min
} as const;

export type RateLimitKey = keyof typeof RATE_LIMITS;

export function limit(route: RateLimitKey, ip: string) {
  const cfg = RATE_LIMITS[route];
  return rateLimit(`${route}:${ip}`, cfg.max, cfg.windowMs);
}
