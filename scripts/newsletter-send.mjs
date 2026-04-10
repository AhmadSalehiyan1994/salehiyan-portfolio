import pg from "pg";
import nodemailer from "nodemailer";

const { Pool } = pg;

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function smtpConfig() {
  return {
    host: required("SMTP_HOST"),
    port: Number(required("SMTP_PORT")),
    user: required("SMTP_USER"),
    pass: required("SMTP_PASS"),
    from: required("SMTP_FROM"),
  };
}

async function run() {
  const connectionString = required("DATABASE_URL");
  const subject = required("NEWSLETTER_SUBJECT");
  const text = required("NEWSLETTER_TEXT");
  const html = process.env.NEWSLETTER_HTML || undefined;

  const smtp = smtpConfig();
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  const pool = new Pool({
    connectionString,
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
          }
        : false,
  });

  const { rows } = await pool.query(
    "select email from newsletter_subscriptions where status = 'confirmed' order by confirmed_at desc;",
  );

  console.log(`Found ${rows.length} confirmed subscribers`);

  let sent = 0;
  for (const row of rows) {
    const to = row.email;
    await transport.sendMail({ from: smtp.from, to, subject, text, html });
    sent += 1;
    if (sent % 25 === 0) {
      console.log(`Sent ${sent}/${rows.length}...`);
    }
  }

  await pool.end();
  console.log(`✅ Newsletter sent to ${sent} subscribers`);
}

run().catch((error) => {
  console.error("❌ newsletter send failed", error.message);
  process.exit(1);
});
