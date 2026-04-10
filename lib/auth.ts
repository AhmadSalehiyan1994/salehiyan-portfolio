import jwt from "jsonwebtoken";
import type { NextResponse } from "next/server";

type Role = "member" | "admin";

export type SessionPayload = {
  sub: string;
  role: Role;
  email: string;
  name: string;
  sessionVersion: number;
};

export type VerifiedSessionPayload = SessionPayload & {
  iat?: number;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return secret;
}

export function signSessionToken(payload: SessionPayload) {
  return jwt.sign(payload, getSecret(), {
    expiresIn: "30d",
    issuer: "ahmad-portfolio",
  });
}

export function verifySessionToken(token: string): VerifiedSessionPayload | null {
  try {
    const decoded = jwt.verify(token, getSecret(), {
      issuer: "ahmad-portfolio",
    });

    if (typeof decoded !== "object" || !decoded.sub || !decoded.role || !decoded.sessionVersion) {
      return null;
    }

    return decoded as VerifiedSessionPayload;
  } catch {
    return null;
  }
}

export function createCsrfToken() {
  return crypto.randomUUID();
}

export function setAuthCookies(response: NextResponse, token: string, csrfToken: string) {
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set("member_session", token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  response.cookies.set("csrf_token", csrfToken, {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("member_session");
  response.cookies.delete("csrf_token");
}
