import { spawn } from "node:child_process";

const intervalMinutes = Number(process.env.BACKEND_JOB_INTERVAL_MINUTES ?? 60);
const intervalMs = Math.max(intervalMinutes, 1) * 60 * 1000;

function runMaintenanceJob() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["scripts/run-backend-jobs.mjs"], {
      stdio: "inherit",
      env: process.env,
    });

    child.on("close", (code) => {
      resolve(code ?? 1);
    });
  });
}

async function main() {
  console.log(`▶ backend scheduler started (every ${intervalMinutes} min)`);

  while (true) {
    const startedAt = new Date().toISOString();
    console.log(`\n[${startedAt}] running maintenance jobs...`);

    const code = await runMaintenanceJob();
    if (code !== 0) {
      console.error(`maintenance job exited with code ${code}`);
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

main().catch((error) => {
  console.error("scheduler failed", error.message);
  process.exit(1);
});
