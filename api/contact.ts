const MAX_PAYLOAD_BYTES = 8192;
const ALLOWED_CATEGORIES = new Set([
  "Lesson Feedback",
  "Question",
  "Partnership",
  "General",
  "general",
]);

function validEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const email = value.trim();
  if (email.length < 6 || email.length > 254 || /\s/.test(email)) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  if (!/^[a-z0-9!#$%&'*+/=?^_\x60{|}~.-]+$/i.test(local)) return false;
  if (domain.length > 253 || !domain.includes(".") || domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) return false;
  const labels = domain.split(".");
  if (labels.some(label => !label || label.length > 63 || label.startsWith("-") || label.endsWith("-") || !/^[a-z0-9-]+$/i.test(label))) return false;
  return /^[a-z]{2,24}$/i.test(labels[labels.length - 1]);
}

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Vary", "Origin");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const origin = req.headers?.origin;
  const allowedOrigins = new Set(["https://www.learnmlacademy.com", "https://learnmlacademy.com"]);
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    allowedOrigins.add("https://" + process.env.VERCEL_URL);
  }
  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }
  if (typeof origin !== "string" || !allowedOrigins.has(origin)) {
    return res.status(403).json({ error: "Cross-site contact submission is not allowed." });
  }

  const contentType = String(req.headers?.["content-type"] || "").split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return res.status(415).json({ error: "Use application/json for contact submissions." });
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ error: "Invalid contact submission." });
  }

  let serializedBody: string;
  try {
    serializedBody = JSON.stringify(req.body);
  } catch {
    return res.status(400).json({ error: "Invalid contact submission." });
  }
  if (Number(req.headers?.["content-length"] || 0) > MAX_PAYLOAD_BYTES || serializedizedLength(serializedBody) > MAX_PAYLOAD_BYTES) {
    return res.status(413).json({ error: "Your message is too large. Please shorten it and try again." });
  }

  if (typeof req.body.website === "string" && req.body.website.trim()) {
    return res.status(400).json({ error: "Invalid contact submission." });
  }

  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const message = typeof req.body.message === "string" ? req.body.message.trim() : "";
  const category = typeof req.body.subject === "string" ? req.body.subject.trim() : "";

  if (name.length > 100) return res.status(400).json({ error: "Please keep your name under 100 characters." });
  if (!validEmail(email)) return res.status(400).json({ error: "Please enter a valid email address." });
  if (!ALLOWED_CATEGORIES.has(category)) return res.status(400).json({ error: "Please choose a valid inquiry category." });
  if (message.length < 3 || message.length > 6000) {
    return res.status(400).json({ error: "Please enter a message between 3 and 6,000 characters." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
  if (!apiKey || !senderEmail || !recipientEmail || !validEmail(senderEmail) || !validEmail(recipientEmail)) {
    return res.status(503).json({ error: "Server-side contact delivery is not configured." });
  }

  const senderName = (process.env.BREVO_SENDER_NAME || "LearnMLAcademy").trim().slice(0, 80);
  const normalizedCategory = category === "general" ? "General" : category;
  const textContent = [
    "New LearnMLAcademy contact form message",
    "",
    "Name: " + (name || "Not provided"),
    "Email: " + email,
    "Category: " + normalizedCategory,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: recipientEmail }],
        replyTo: { email, ...(name ? { name } : {}) },
        subject: "[LearnMLAcademy] " + normalizedCategory,
        textContent,
      }),
    });

    if (brevoResponse.status !== 201 && brevoResponse.status !== 202) {
      return res.status(502).json({ error: "The message could not be sent right now." });
    }
    return res.status(200).json({ ok: true, message: "Message sent." });
  } catch {
    return res.status(502).json({ error: "The message service is temporarily unavailable." });
  }
}

function serializedizedLength(value: string): number {
  return new TextEncoder().encode(value).length;
}
