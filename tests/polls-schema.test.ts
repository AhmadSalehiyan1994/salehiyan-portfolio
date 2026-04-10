import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("poll schema migration", () => {
  it("contains one-ballot-per-member constraint", () => {
    const sql = readFileSync(
      join(process.cwd(), "SQL/migrations/20260322_001_poll_phase1.sql"),
      "utf-8",
    );

    expect(sql).toContain("unique (poll_id, member_id)");
    expect(sql).toContain("create table if not exists poll_ballot_choices");
  });

  it("contains comments and badge tables in phase2 migration", () => {
    const sql = readFileSync(
      join(process.cwd(), "SQL/migrations/20260322_002_members_engagement_phase2.sql"),
      "utf-8",
    );

    expect(sql).toContain("create table if not exists poll_comments");
    expect(sql).toContain("create table if not exists member_badges");
  });

  it("contains contact submissions table in phase3 migration", () => {
    const sql = readFileSync(
      join(process.cwd(), "SQL/migrations/20260323_003_contact_submissions.sql"),
      "utf-8",
    );

    expect(sql).toContain("create table if not exists contact_submissions");
    expect(sql).toContain("source text not null default 'website-contact-form'");
  });

  it("contains client error event table in phase3 migration", () => {
    const sql = readFileSync(
      join(process.cwd(), "SQL/migrations/20260323_004_client_error_events.sql"),
      "utf-8",
    );

    expect(sql).toContain("create table if not exists client_error_events");
    expect(sql).toContain("metadata jsonb not null default '{}'::jsonb");
  });

  it("contains GIN index for poll_notifications metadata", () => {
    const sql = readFileSync(
      join(process.cwd(), "SQL/migrations/20260323_005_poll_notifications_metadata_gin.sql"),
      "utf-8",
    );

    expect(sql).toContain("create index if not exists idx_poll_notifications_metadata_gin");
    expect(sql).toContain("on poll_notifications using gin (metadata)");
  });

  it("contains backend hardening foundation tables", () => {
    const sql = readFileSync(
      join(process.cwd(), "SQL/migrations/20260323_006_backend_hardening.sql"),
      "utf-8",
    );

    expect(sql).toContain("create table if not exists admin_audit_logs");
    expect(sql).toContain("create table if not exists request_rate_limits");
    expect(sql).toContain("create table if not exists backend_job_runs");
    expect(sql).toContain("add column if not exists session_version");
  });
});
