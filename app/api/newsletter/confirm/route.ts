import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/lib/db";
import { siteContent } from "@/lib/content";

export const runtime = "nodejs";

function sha256Hex(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token || token.length < 16) {
      return NextResponse.redirect(new URL("/insights?subscribe=invalid", siteContent.person.website));
    }

    const tokenHash = sha256Hex(token);
    const db = getDb();

    const found = await db.query(
      `
        select id, email
        from newsletter_confirmation_tokens
        where token_hash = $1
          and consumed_at is null
          and expires_at > now()
        limit 1;
      `,
      [tokenHash],
    );

    if (!found.rowCount) {
      return NextResponse.redirect(new URL("/insights?subscribe=expired", siteContent.person.website));
    }

    const { id, email } = found.rows[0] as { id: string; email: string };

    await db.query(
      `
        update newsletter_subscriptions
        set status = 'confirmed', confirmed_at = now(), updated_at = now()
        where email = $1;
      `,
      [email],
    );

    await db.query(
      "update newsletter_confirmation_tokens set consumed_at = now() where id = $1;",
      [id],
    );

    return NextResponse.redirect(new URL("/insights?subscribe=confirmed", siteContent.person.website));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message.includes("DATABASE_URL")) {
      return NextResponse.redirect(new URL("/insights?subscribe=unavailable", siteContent.person.website));
    }
    return NextResponse.redirect(new URL("/insights?subscribe=error", siteContent.person.website));
  }
}
