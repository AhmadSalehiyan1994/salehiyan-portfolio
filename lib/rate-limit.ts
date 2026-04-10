import { getDb } from "@/lib/db";

export async function enforceDbRateLimit(params: {
  routeKey: string;
  subjectKey: string;
  windowSeconds: number;
  maxHits: number;
}) {
  const db = getDb();
  const now = new Date();
  const windowMillis = params.windowSeconds * 1000;
  const windowStart = new Date(Math.floor(now.getTime() / windowMillis) * windowMillis);

  const result = await db.query(
    `
      insert into request_rate_limits (route_key, subject_key, window_start, hits, updated_at)
      values ($1, $2, $3, 1, now())
      on conflict (route_key, subject_key, window_start)
      do update set hits = request_rate_limits.hits + 1, updated_at = now()
      returning hits;
    `,
    [params.routeKey, params.subjectKey, windowStart.toISOString()],
  );

  const hits = Number(result.rows[0]?.hits ?? 0);
  return {
    limited: hits > params.maxHits,
    hits,
    remaining: Math.max(params.maxHits - hits, 0),
    retryAfterSeconds: params.windowSeconds,
  };
}
