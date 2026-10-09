import { readFile } from "node:fs/promises";
import path from "node:path";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
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
