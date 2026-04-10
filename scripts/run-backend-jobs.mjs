import pg from "pg";

const { Pool } = pg;

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

async function run() {
  const connectionString = required("DATABASE_URL");
  const retentionClientErrorsDays = Number(process.env.RETENTION_CLIENT_ERRORS_DAYS ?? 30);
  const retentionContactDays = Number(process.env.RETENTION_CONTACT_SUBMISSIONS_DAYS ?? 365);
  const retentionNotificationsDays = Number(process.env.RETENTION_NOTIFICATIONS_DAYS ?? 180);
  const retentionRateLimitsDays = Number(process.env.RETENTION_RATE_LIMIT_DAYS ?? 30);
  const retentionAdminAuditDays = Number(process.env.RETENTION_ADMIN_AUDIT_DAYS ?? 365);
  const retentionJobRunsDays = Number(process.env.RETENTION_BACKEND_JOB_RUNS_DAYS ?? 180);

  const pool = new Pool({
    connectionString,
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });

  const client = await pool.connect();

  try {
    await client.query("begin");

    const runInsert = await client.query(
      `
        insert into backend_job_runs (job_name, status, details)
        values ('retention-and-maintenance', 'running', '{}'::jsonb)
        returning id;
      `,
    );

    const runId = runInsert.rows[0].id;

    const deleteClientErrors = await client.query(
      `
        delete from client_error_events
        where created_at < now() - make_interval(days => $1::int);
      `,
      [retentionClientErrorsDays],
    );

    const deleteContact = await client.query(
      `
        delete from contact_submissions
        where created_at < now() - make_interval(days => $1::int);
      `,
      [retentionContactDays],
    );

    const deleteNotifications = await client.query(
      `
        delete from poll_notifications
        where is_read = true
          and created_at < now() - make_interval(days => $1::int);
      `,
      [retentionNotificationsDays],
    );

    const badgeAward = await client.query(
      `
        with badge as (
          select id
          from poll_badges
          where slug = 'top-contributor'
          limit 1
        ), eligible as (
          select b.member_id
          from poll_ballots b
          group by b.member_id
          having count(*) >= 10
        )
        insert into member_badges (member_id, badge_id, reason)
        select e.member_id, badge.id, 'Reached 10+ votes'
        from eligible e
        cross join badge
        on conflict do nothing;
      `,
    );

    const deleteRateLimits = await client.query(
      `
        delete from request_rate_limits
        where updated_at < now() - make_interval(days => $1::int);
      `,
      [retentionRateLimitsDays],
    );

    const deleteAuditLogs = await client.query(
      `
        delete from admin_audit_logs
        where created_at < now() - make_interval(days => $1::int);
      `,
      [retentionAdminAuditDays],
    );

    const deleteJobRuns = await client.query(
      `
        delete from backend_job_runs
        where finished_at is not null
          and finished_at < now() - make_interval(days => $1::int);
      `,
      [retentionJobRunsDays],
    );

    await client.query(
      `
        update backend_job_runs
        set
          status = 'success',
          finished_at = now(),
          details = jsonb_build_object(
            'deletedClientErrors', $2::int,
            'deletedContactSubmissions', $3::int,
            'deletedReadNotifications', $4::int,
            'awardedBadges', $5::int,
            'deletedRateLimits', $6::int,
            'deletedAdminAuditLogs', $7::int,
            'deletedBackendJobRuns', $8::int
          )
        where id = $1;
      `,
      [
        runId,
        deleteClientErrors.rowCount ?? 0,
        deleteContact.rowCount ?? 0,
        deleteNotifications.rowCount ?? 0,
        badgeAward.rowCount ?? 0,
        deleteRateLimits.rowCount ?? 0,
        deleteAuditLogs.rowCount ?? 0,
        deleteJobRuns.rowCount ?? 0,
      ],
    );

    await client.query("commit");

    console.log("✅ backend jobs completed", {
      runId,
      deletedClientErrors: deleteClientErrors.rowCount ?? 0,
      deletedContactSubmissions: deleteContact.rowCount ?? 0,
      deletedReadNotifications: deleteNotifications.rowCount ?? 0,
      awardedBadges: badgeAward.rowCount ?? 0,
      deletedRateLimits: deleteRateLimits.rowCount ?? 0,
      deletedAdminAuditLogs: deleteAuditLogs.rowCount ?? 0,
      deletedBackendJobRuns: deleteJobRuns.rowCount ?? 0,
    });
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((error) => {
  console.error("❌ jobs failed", error.message);
  process.exit(1);
});
