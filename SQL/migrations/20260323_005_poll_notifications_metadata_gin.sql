-- Phase 3C: GIN index for poll_notifications.metadata
-- Purpose:
--   Complete JSONB index coverage across backend telemetry/notification tables.
-- Why needed:
--   `poll_notifications.metadata` is JSONB and can be queried by keys/values
--   (for example poll IDs, badge metadata, or notification filters).
-- Notes:
--   - Idempotent migration (safe re-run)
--   - Uses PostgreSQL GIN index for efficient JSONB lookups

create index if not exists idx_poll_notifications_metadata_gin
  on poll_notifications using gin (metadata);
