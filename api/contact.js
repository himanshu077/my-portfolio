// Vercel function behind the contact form. The mail endpoint rejects any request
// carrying an Origin header, so the browser can't call it directly; this makes a
// server-side request instead. The recipient is fixed here, never taken from the
// visitor, so the form can't be used to send mail to arbitrary addresses.
const MAIL_ENDPOINT = process.env.CONTACT_MAIL_ENDPOINT || "https://www.curlys.in/api/contact";
const RECEIVER = process.env.CONTACT_RECEIVER_EMAIL || "himanshukumar077@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const field = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const body = req.body || {};
  const name = field(body.name, 200);
  const email = field(body.email, 320);
  const phone = field(body.phone, 40);
  const message = field(body.message, 5000);

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ success: false, error: "Name, a valid email and a message are required" });
  }

  const html =
    `<p>New message from the portfolio contact form.</p>` +
    `<p><b>Name:</b> ${escapeHtml(name)}<br>` +
    `<b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` +
    (phone ? `<br><b>Phone:</b> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>` : "") +
    `</p><h3>Message</h3><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;

  try {
    const upstream = await fetch(MAIL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: RECEIVER,
        subject: `Portfolio enquiry from ${name}`,
        body: html,
        phone,
      }),
    });
    const result = await upstream.json().catch(() => ({}));
    if (!upstream.ok || result.success === false) {
      console.error("contact_mail_upstream_failed", upstream.status, result);
      return res.status(502).json({ success: false, error: "Mail service rejected the message" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("contact_mail_request_failed", error);
    return res.status(502).json({ success: false, error: "Mail service unreachable" });
  }
};
