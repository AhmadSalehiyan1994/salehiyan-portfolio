import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}_${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
}

async function run() {
  const databaseUrl = required("DATABASE_URL");
  const backupDir = process.env.BACKUP_DIR || "backups";
  mkdirSync(backupDir, { recursive: true });

  const outputFile = join(backupDir, `db_${timestamp()}.dump`);

  await new Promise((resolve, reject) => {
    const child = spawn("pg_dump", [databaseUrl, "--format=custom", `--file=${outputFile}`], {
      stdio: "inherit",
      env: process.env,
    });

    child.on("close", (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`pg_dump failed with code ${code}`));
    });
  });

  console.log("✅ backup created", { outputFile });
}

run().catch((error) => {
  console.error("❌ backup failed", error.message);
  process.exit(1);
});
