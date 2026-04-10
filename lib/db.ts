import { Pool } from "pg";

declare global {
  var __pollDbPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  return new Pool({
    connectionString,
    max: 10,
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });
}

export function getDb() {
  if (global.__pollDbPool) {
    return global.__pollDbPool;
  }

  const pool = createPool();

  if (process.env.NODE_ENV !== "production") {
    global.__pollDbPool = pool;
  }

  return pool;
}
