import { readFile } from "node:fs/promises";
import path from "node:path";

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


const BLOCKED_DOMAINS = new Set([
  "b.com", "a.com", "c.com", "d.com", "e.com", "f.com",
  "test.com", "fake.com", "dummy.com", "asdf.com", "qwerty.com",
  "sample.com", "nowhere.com", "nomail.com", "example.com", "example.org", "example.net",
  "mailinator.com", "tempmail.com", "10minutemail.com",
  "guerrillamail.com", "throwawaymail.com", "yopmail.com",
  "trashmail.com", "sharklasers.com", "dispostable.com",
  "getairmail.com", "maildrop.cc", "temp-mail.org", "mytempemail.com"
]);

const DUMMY_LOCAL_PARTS = new Set([
  "test", "fake", "asdf", "qwerty", "dummy", "sample",
  "noemail", "nobody", "null", "undefined", "temp", "trash",
  "admin", "administrator", "user", "unknown", "abc", "xyz",
  "none", "na", "testing"
]);

function isValidEmailAddress(raw: unknown): boolean {
  if (typeof raw !== "string") return false;
  const email = raw.trim().toLowerCase();

  if (email.length < 6 || email.length > 254) return false;

  const atParts = email.split("@");
  if (atParts.length !== 2) return false;

  const [local, fullDomain] = atParts;

  if (local.length < 2 || local.length > 64) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local)) return false;

  if (DUMMY_LOCAL_PARTS.has(local)) return false;
  if (/^(.)\1+$/.test(local) && local.length >= 3) return false;

  if (!fullDomain.includes(".") || fullDomain.length > 253) return false;
  if (fullDomain.startsWith(".") || fullDomain.endsWith(".") || fullDomain.includes("..")) return false;

  const domainParts = fullDomain.split(".");
  if (domainParts.length < 2) return false;

  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-z]{2,24}$/.test(tld)) return false;

  const sld = domainParts[domainParts.length - 2];
  if (sld.length < 2) return false;

  for (const part of domainParts) {
    if (part.length === 0 || part.length > 63) return false;
    if (part.startsWith("-") || part.endsWith("-")) return false;
    if (!/^[a-z0-9-]+$/.test(part)) return false;
  }

  if (local === sld) return false;
  if (BLOCKED_DOMAINS.has(fullDomain)) return false;

  return true;
}

const DEFAULT_LIST_ID = 2;

const GUIDES = {
  ml: {
    filename: "ML_Interview_Cheatsheet.pdf",
    downloadName: "ML_Interview_Cheatsheet.pdf",
    source: "LearnMLAcademy | ML Interview Cheatsheet",
  },
  "deep-learning": {
    filename: "Deep_Learning_Interview_Handbook_2026.pdf",
    downloadName: "Deep_Learning_Interview_Handbook_2026.pdf",
    source: "LearnMLAcademy | Deep Learning Interview Handbook",
  },
  "generative-ai": {
    filename: "Generative_AI_Interview_Handbook_2026.pdf",
    downloadName: "Generative_AI_Interview_Handbook_2026.pdf",
    source: "LearnMLAcademy | Generative AI Interview Handbook",
  },
  "llm-rag": {
    filename: "LLM_RAG_Interview_Handbook_2026.pdf",
    downloadName: "LLM_RAG_Interview_Handbook_2026.pdf",
    source: "LearnMLAcademy | LLM RAG Interview Handbook",
  },
  "agentic-ai": {
    filename: "Agentic_AI_Interview_Handbook_2026.pdf",
    downloadName: "Agentic_AI_Interview_Handbook_2026.pdf",
    source: "LearnMLAcademy | Agentic AI Interview Handbook",
  },
  python: {
    filename: "Python_for_ML_AI_Interviews_2026.pdf",
    downloadName: "Python_for_ML_AI_Interviews_2026.pdf",
    source: "LearnMLAcademy | Python ML AI Interviews",
  },
  sql: {
    filename: "SQL_for_Data_AI_Interviews_2026.pdf",
    downloadName: "SQL_for_Data_AI_Interviews_2026.pdf",
    source: "LearnMLAcademy | SQL Data AI Interviews",
  },
  "system-design": {
    filename: "ML_AI_System_Design_Interview_Handbook_2026.pdf",
    downloadName: "ML_AI_System_Design_Interview_Handbook_2026.pdf",
    source: "LearnMLAcademy | ML AI System Design Interview Handbook",
  },
  mlops: {
    filename: "MLOps_Production_AI_Interview_Handbook_2026.pdf",
    downloadName: "MLOps_Production_AI_Interview_Handbook_2026.pdf",
    source: "LearnMLAcademy | MLOps Production AI Interview Handbook",
  },
  behavioral: {
    filename: "Behavioral_Project_Interview_Handbook_2026.pdf",
    downloadName: "Behavioral_Project_Interview_Handbook_2026.pdf",
    source: "LearnMLAcademy | Behavioral Project Interview Handbook",
  },
} as const;

type GuideId = keyof typeof GUIDES;

function resolveGuide(value: unknown): GuideId | null {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(GUIDES, value)
    ? (value as GuideId) : null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Browser POST requests supply an Origin. Do not trust a caller-controlled Host
  // as permission to add arbitrary origins; preview hosts come from Vercel env.
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
    return res.status(403).json({ error: "Cross-site signup is not allowed." });
  }

  const contentType = String(req.headers?.["content-type"] || "").split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return res.status(415).json({ error: "Use application/json for signup." });
  }
  // This endpoint only needs one short email, consent and a handbook ID.
  // Cap the parsed payload before it reaches the email provider.
  if (!req.body || typeof req.body !== "object" ||
      Number(req.headers?.["content-length"] || 0) > 4096 ||
      JSON.stringify(req.body).length > 4096) {
    return res.status(413).json({ error: "Signup request is too large." });
  }
  if (req.body.consent !== true) {
    return res.status(400).json({ error: "Please agree to receive the PDF and learning emails." });
  }
  if (typeof req.body.website === "string" && req.body.website.trim()) {
    return res.status(400).json({ error: "Invalid signup." });
  }

  const email = typeof req.body?.email === "string"
    ? req.body.email.trim().toLowerCase()
    : "";

  if (!isValidEmailAddress(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Newsletter signup is temporarily unavailable." });
  }

  const listId = Number(process.env.BREVO_LIST_ID || DEFAULT_LIST_ID);
  if (!Number.isInteger(listId) || listId <= 0) {
    return res.status(500).json({ error: "Newsletter configuration is invalid." });
  }

  const guideId = resolveGuide(req.body?.guide);
  if (!guideId) return res.status(400).json({ error: "Unknown PDF guide." });
  const guide = GUIDES[guideId];

  if (!(await enforceRateLimit(req, res, "newsletter", { maxRequests: 5, windowSeconds: 600 }))) {
    return;
  }

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      signal: AbortSignal.timeout(10000),
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
        attributes: {
          SOURCE: guide.source,
        },
      }),
    });

    if (brevoResponse.status !== 201 && brevoResponse.status !== 204) {
      return res.status(502).json({ error: "We could not save your signup. Please try again." });
    }

    const pdfPath = path.join(process.cwd(), "private", guide.filename);
    const pdf = await readFile(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${guide.downloadName}"`);
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).send(pdf);
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return res.status(503).json({ error: "This PDF is temporarily unavailable. Please try again shortly." });
    }
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
