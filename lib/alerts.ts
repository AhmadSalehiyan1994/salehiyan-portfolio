import { createHmac } from "node:crypto";

const dedupCache = new Map<string, number>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendAlertWebhook(payload: {
  title: string;
  severity: "low" | "medium" | "high";
  source: string;
  details?: Record<string, unknown>;
}) {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const dedupWindowMs = Number(process.env.ALERT_DEDUP_WINDOW_MS ?? 60_000);
  const retryAttempts = Math.max(Number(process.env.ALERT_RETRY_ATTEMPTS ?? 3), 1);
  const timeoutMs = Math.max(Number(process.env.ALERT_TIMEOUT_MS ?? 5000), 1000);

  const body = JSON.stringify({
    timestamp: new Date().toISOString(),
    ...payload,
  });

  const dedupKey = `${payload.source}:${payload.severity}:${payload.title}:${body}`;
  const now = Date.now();
  const previous = dedupCache.get(dedupKey);
  if (previous && now - previous < dedupWindowMs) {
    return;
  }
  dedupCache.set(dedupKey, now);

  const secret = process.env.ALERT_WEBHOOK_SECRET;
  const signature = secret ? createHmac("sha256", secret).update(body).digest("hex") : null;

  for (let attempt = 1; attempt <= retryAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(signature ? { "x-alert-signature": signature } : {}),
        },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok) {
        return;
      }
    } catch {
      clearTimeout(timeout);
    }

    if (attempt < retryAttempts) {
      await sleep(250 * attempt);
    }
  }
}
