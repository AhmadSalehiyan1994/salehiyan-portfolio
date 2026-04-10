import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { getDb } from "@/lib/db";
import { enforceDbRateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { siteContent } from "@/lib/content";

export const runtime = "nodejs";

function getClientId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

const subscribeSchema = z.object({
  email: z.string().trim().email(),
});

function sha256Hex(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function POST(request: Request) {
  try {
    const clientId = getClientId(request);
    const limiter = await enforceDbRateLimit({
      routeKey: "newsletter",
      subjectKey: clientId,
      windowSeconds: 10,
      maxHits: 2,
    });

    if (limiter.limited) {
      return NextResponse.json(
        { success: false, message: "Please wait a few seconds before trying again." },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
    }

    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase();
    const db = getDb();

    const existing = await db.query(
      "select email, status from newsletter_subscriptions where email = $1 limit 1;",
      [email],
    );

    if (existing.rowCount && existing.rows[0]?.status === "confirmed") {
      return NextResponse.json({ success: true, message: "You're already subscribed." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256Hex(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await db.query(
      `
        insert into newsletter_subscriptions (email, status)
        values ($1, 'pending')
        on conflict (email) do update set status = 'pending', updated_at = now();
      `,
      [email],
    );

    await db.query(
      `
        insert into newsletter_confirmation_tokens (email, token_hash, expires_at)
        values ($1, $2, $3);
      `,
      [email, tokenHash, expiresAt.toISOString()],
    );

    const confirmUrl = `${siteContent.person.website.replace(/\/$/, "")}/api/newsletter/confirm?token=${token}`;
    const subject = "Confirm your subscription";
    const text = `Hi!\n\nPlease confirm your subscription by clicking this link:\n${confirmUrl}\n\nIf you didn't request this, you can ignore this email.`;

    const sendResult = await sendEmail({
      to: email,
      subject,
      text,
      html: `<p>Hi!</p><p>Please confirm your subscription:</p><p><a href="${confirmUrl}">${confirmUrl}</a></p><p>If you didn't request this, you can ignore this email.</p>`,
    });

    if (!sendResult.sent) {
      console.info("[newsletter] SMTP not configured; confirm URL:", confirmUrl);
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! Check your email to confirm your subscription.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message.includes("DATABASE_URL")) {
      return NextResponse.json(
        { success: false, message: "Newsletter is not configured on this deployment." },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Unable to subscribe right now." },
      { status: 500 },
    );
  }
}
