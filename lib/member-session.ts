import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { getDb } from "@/lib/db";

type MemberSession = {
  memberId: string | null;
  role: "guest" | "member" | "admin";
  email?: string;
  name?: string;
};

export function getMemberSession(): MemberSession {
  const cookieStore = cookies();

  const token = cookieStore.get("member_session")?.value;
  if (!token) {
    return { memberId: null, role: "guest" };
  }

  const decoded = verifySessionToken(token);
  if (!decoded) {
    return { memberId: null, role: "guest" };
  }

  if (decoded.role === "admin") {
    return { memberId: decoded.sub, role: "admin", email: decoded.email, name: decoded.name };
  }

  return { memberId: decoded.sub, role: "member", email: decoded.email, name: decoded.name };
}

export async function getVerifiedMemberSession(): Promise<MemberSession> {
  const cookieStore = cookies();
  const token = cookieStore.get("member_session")?.value;

  if (!token) {
    return { memberId: null, role: "guest" };
  }

  const decoded = verifySessionToken(token);
  if (!decoded) {
    return { memberId: null, role: "guest" };
  }

  const db = getDb();
  const result = await db.query(
    `
      select id, role, full_name, email, is_active, session_version, token_revoked_before
      from members
      where id = $1
      limit 1;
    `,
    [decoded.sub],
  );

  if ((result.rowCount ?? 0) === 0) {
    return { memberId: null, role: "guest" };
  }

  const member = result.rows[0];

  if (!member.is_active) {
    return { memberId: null, role: "guest" };
  }

  if (Number(member.session_version) !== Number(decoded.sessionVersion)) {
    return { memberId: null, role: "guest" };
  }

  if (decoded.iat && member.token_revoked_before) {
    const issuedAtMs = decoded.iat * 1000;
    const revokedBeforeMs = new Date(member.token_revoked_before).getTime();
    if (issuedAtMs <= revokedBeforeMs) {
      return { memberId: null, role: "guest" };
    }
  }

  return {
    memberId: member.id,
    role: member.role === "admin" ? "admin" : "member",
    email: member.email,
    name: member.full_name,
  };
}
