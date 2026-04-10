import nodemailer from "nodemailer";

export type SendEmailArgs = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !port || !user || !pass || !from) {
    return null;
  }

  return { host, port, user, pass, from };
}

export async function sendEmail(args: SendEmailArgs) {
  const cfg = getSmtpConfig();
  if (!cfg) {
    return { sent: false, reason: "SMTP not configured" } as const;
  }

  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
  });

  await transport.sendMail({
    from: cfg.from,
    to: args.to,
    subject: args.subject,
    text: args.text,
    html: args.html,
  });

  return { sent: true } as const;
}
