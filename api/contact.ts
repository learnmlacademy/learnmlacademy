const MAX_PAYLOAD_BYTES = 8192;
const ALLOWED_CATEGORIES = new Set([
  "Lesson Feedback",
  "Question",
  "Partnership",
  "General",
  "general",
]);

const rateLimitStore = new Map<string, number[]>();

function extractClientIp(req: any): string {
  if (!req) return "127.0.0.1";
  const vercelForwarded = req.headers?.["x-vercel-forwarded-for"];
  if (typeof vercelForwarded === "string" && vercelForwarded.trim()) {
    return vercelForwarded.split(",")[0].trim();
  }
  const forwarded = req.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers?.["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) {
    return realIp.trim();
  }
  return req.socket?.remoteAddress || "127.0.0.1";
}

async function enforceRateLimit(
  req: any,
  res: any,
  action: string,
  optionsOrMax: number | { maxRequests?: number; windowSeconds?: number } = 5,
  windowSecondsParam = 600
): Promise<boolean> {
  const maxRequests = typeof optionsOrMax === "number" ? optionsOrMax : (optionsOrMax?.maxRequests ?? 5);
  const windowSeconds = typeof optionsOrMax === "number" ? windowSecondsParam : (optionsOrMax?.windowSeconds ?? 600);
  const ip = extractClientIp(req);
  const key = `rl:${action}:${ip}`;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const cleanUrl = redisUrl.replace(/\/+$/, "");
      const response = await fetch(`${cleanUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([["INCR", key], ["TTL", key]]),
      });
      if (response.ok) {
        const data = await response.json();
        const count = Number(data[0]?.result);
        let ttl = Number(data[1]?.result);
        if (ttl <= 0) {
          fetch(`${cleanUrl}/expire/${encodeURIComponent(key)}/${windowSeconds}`, {
            headers: { Authorization: `Bearer ${redisToken}` },
          }).catch(() => {});
          ttl = windowSeconds;
        }
        res.setHeader("X-RateLimit-Limit", String(maxRequests));
        res.setHeader("X-RateLimit-Remaining", String(Math.max(0, maxRequests - count)));
        if (count > maxRequests) {
          res.setHeader("Retry-After", String(Math.max(1, ttl)));
          res.status(429).json({
            error: "Too many requests. Please try again later.",
            retryAfterSeconds: Math.max(1, ttl),
          });
          return false;
        }
        return true;
      }
    } catch {
      // Fall back to memory on Redis failure
    }
  }

  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const cutoff = now - windowMs;
  let timestamps = rateLimitStore.get(key) || [];
  timestamps = timestamps.filter((t) => t > cutoff);

  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0];
    const retryAfter = Math.ceil(Math.max(1000, oldest + windowMs - now) / 1000);
    res.setHeader("X-RateLimit-Limit", String(maxRequests));
    res.setHeader("X-RateLimit-Remaining", "0");
    res.setHeader("Retry-After", String(retryAfter));
    res.status(429).json({
      error: "Too many requests. Please try again later.",
      retryAfterSeconds: retryAfter,
    });
    return false;
  }

  timestamps.push(now);
  rateLimitStore.set(key, timestamps);
  res.setHeader("X-RateLimit-Limit", String(maxRequests));
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, maxRequests - timestamps.length)));
  return true;
}

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

  if (Number(req.headers?.["content-length"] || 0) > MAX_PAYLOAD_BYTES || serializedByteLength(serializedBody) > MAX_PAYLOAD_BYTES) {
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

  if (!(await enforceRateLimit(req, res, "contact", 10, 600))) {
    return;
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

function serializedByteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}
