import nodemailer from "nodemailer";

export type OrderEmailPayload = {
  craft: string;
  details: string;
  budget: string;
  name: string;
  phone: string;
  city: string;
  images: { filename: string; buffer: Buffer; contentType: string }[];
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally SMTP_SECURE, MAIL_FROM, ORDER_NOTIFICATION_EMAIL) in .env.local."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
    // Fail fast instead of hanging for nodemailer's ~2min defaults — a blocked
    // outbound SMTP port (common on some ISPs/networks) would otherwise look
    // like the UI is frozen rather than surfacing a clear error.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export async function sendOrderEmail(order: OrderEmailPayload) {
  const transporter = getTransporter();
  const to = process.env.ORDER_NOTIFICATION_EMAIL || "hello@borooa.com";
  const from = process.env.MAIL_FROM || process.env.SMTP_USER!;

  const html = `
    <div dir="rtl" style="font-family: sans-serif; font-size: 15px; color: #111;">
      <h2 style="color:#db2777;">طلب جديد من بروع</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        <tr><td><strong>الحرفة</strong></td><td>${escapeHtml(order.craft)}</td></tr>
        <tr><td><strong>الميزانية</strong></td><td>${escapeHtml(order.budget)}</td></tr>
        <tr><td><strong>الاسم</strong></td><td>${escapeHtml(order.name)}</td></tr>
        <tr><td><strong>رقم الجوال</strong></td><td dir="ltr">${escapeHtml(order.phone)}</td></tr>
        <tr><td><strong>المدينة</strong></td><td>${escapeHtml(order.city || "—")}</td></tr>
      </table>
      <p><strong>تفاصيل الطلب:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(order.details || "—")}</p>
      ${order.images.length ? `<p>عدد الصور المرفقة: ${order.images.length}</p>` : ""}
    </div>
  `;

  await transporter.sendMail({
    from,
    to,
    replyTo: from,
    subject: `طلب جديد: ${order.craft} — ${order.name}`,
    html,
    attachments: order.images.map((img) => ({
      filename: img.filename,
      content: img.buffer,
      contentType: img.contentType,
    })),
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
