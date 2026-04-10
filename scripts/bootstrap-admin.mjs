import bcrypt from "bcryptjs";
import pg from "pg";

const { Pool } = pg;

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

async function main() {
  const connectionString = required("DATABASE_URL");
  const fullName = required("BOOTSTRAP_ADMIN_NAME");
  const email = required("BOOTSTRAP_ADMIN_EMAIL").toLowerCase();
  const password = required("BOOTSTRAP_ADMIN_PASSWORD");

  if (password.length < 8) {
    throw new Error("BOOTSTRAP_ADMIN_PASSWORD must be at least 8 characters");
  }

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

    const admins = await client.query(
      `
        select count(*)::int as total
        from members
        where role = 'admin';
      `,
    );

    if ((admins.rows[0]?.total ?? 0) > 0) {
      throw new Error("Admin already exists. Bootstrap aborted.");
    }

    const exists = await client.query("select id from members where email = $1 limit 1", [email]);
    if ((exists.rowCount ?? 0) > 0) {
      throw new Error("Email already exists. Choose a different BOOTSTRAP_ADMIN_EMAIL.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const inserted = await client.query(
      `
        insert into members (full_name, email, password_hash, role)
        values ($1, $2, $3, 'admin')
        returning id, full_name, email, role, created_at;
      `,
      [fullName, email, passwordHash],
    );

    await client.query("commit");

    console.log("✅ Admin created:", {
      id: inserted.rows[0].id,
      fullName: inserted.rows[0].full_name,
      email: inserted.rows[0].email,
      role: inserted.rows[0].role,
      createdAt: inserted.rows[0].created_at,
    });
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("❌ bootstrap-admin failed:", error.message);
  process.exit(1);
});
