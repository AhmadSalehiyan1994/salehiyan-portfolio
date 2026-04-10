import { getDb } from "@/lib/db";

type AuditInput = {
  actorMemberId?: string | null;
  actorRole?: string | null;
  action: string;
  targetType?: string | null;
  targetId?: string | null;
  status?: "success" | "failed";
  metadata?: Record<string, unknown>;
};

export async function writeAdminAuditLog(input: AuditInput) {
  try {
    const db = getDb();
    await db.query(
      `
        insert into admin_audit_logs (
          actor_member_id,
          actor_role,
          action,
          target_type,
          target_id,
          status,
          metadata
        )
        values ($1, $2, $3, $4, $5, $6, $7::jsonb);
      `,
      [
        input.actorMemberId ?? null,
        input.actorRole ?? null,
        input.action,
        input.targetType ?? null,
        input.targetId ?? null,
        input.status ?? "success",
        JSON.stringify(input.metadata ?? {}),
      ],
    );
  } catch {
    // best-effort audit logging
  }
}
