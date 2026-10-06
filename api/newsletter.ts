import { readFile } from "node:fs/promises";
import path from "node:path";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_LIST_ID = 2;

const HANDBOOKS = {
  ml: {
    file: "ML_Interview_Cheatsheet.pdf",
    downloadName: "Machine_Learning_Interview_Cheatsheet.pdf",
    source: "Machine Learning Interview Cheatsheet",
  },
  "deep-learning": {
    file: "Deep_Learning_Interview_Handbook_2026.pdf",
    downloadName: "Deep_Learning_Interview_Handbook_2026.pdf",
    source: "Deep Learning Interview Handbook",
  },
  "generative-ai": {
    file: "Generative_AI_Interview_Handbook_2026.pdf",
    downloadName: "Generative_AI_Interview_Handbook_2026.pdf",
    source: "Generative AI Interview Handbook",
  },
  "llm-rag": {
    file: "LLM_RAG_Interview_Handbook_2026.pdf",
    downloadName: "LLM_RAG_Interview_Handbook_2026.pdf",
    source: "LLM & RAG Interview Handbook",
  },
  "agentic-ai": {
    file: "Agentic_AI_Interview_Handbook_2026.pdf",
    downloadName: "Agentic_AI_Interview_Handbook_2026.pdf",
    source: "Agentic AI Interview Handbook",
  },
  python: {
    file: "Python_for_ML_AI_Interviews_2026.pdf",
    downloadName: "Python_for_ML_AI_Interviews_2026.pdf",
    source: "Python for ML & AI Interviews",
  },
  sql: {
    file: "SQL_for_Data_AI_Interviews_2026.pdf",
    downloadName: "SQL_for_Data_AI_Interviews_2026.pdf",
    source: "SQL for Data & AI Interviews",
  },
  "system-design": {
    file: "ML_AI_System_Design_Interview_Handbook_2026.pdf",
    downloadName: "ML_AI_System_Design_Interview_Handbook_2026.pdf",
    source: "ML & AI System Design Interview Handbook",
  },
  mlops: {
    file: "MLOps_Production_AI_Interview_Handbook_2026.pdf",
    downloadName: "MLOps_Production_AI_Interview_Handbook_2026.pdf",
    source: "MLOps & Production AI Interview Handbook",
  },
  behavioral: {
    file: "Behavioral_Project_Interview_Handbook_2026.pdf",
    downloadName: "Behavioral_Project_Interview_Handbook_2026.pdf",
    source: "Behavioral & Project Interview Handbook",
  },
} as const;

type HandbookKey = keyof typeof HANDBOOKS;

function getHandbook(value: unknown) {
  const key = typeof value === "string" ? value : "ml";
  return Object.prototype.hasOwnProperty.call(HANDBOOKS, key)
    ? HANDBOOKS[key as HandbookKey]
    : null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const email = typeof req.body?.email === "string"
    ? req.body.email.trim().toLowerCase()
    : "";

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const handbook = getHandbook(req.body?.handbook);
  if (!handbook) {
    return res.status(400).json({ error: "Unknown interview handbook." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Newsletter signup is temporarily unavailable." });
  }

  const listId = Number(process.env.BREVO_LIST_ID || DEFAULT_LIST_ID);
  if (!Number.isInteger(listId) || listId <= 0) {
    return res.status(500).json({ error: "Newsletter configuration is invalid." });
  }

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
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
          SOURCE: handbook.source,
        },
      }),
    });

    if (brevoResponse.status !== 201 && brevoResponse.status !== 204) {
      return res.status(502).json({ error: "We could not save your signup. Please try again." });
    }

    const pdfPath = path.join(process.cwd(), "private", handbook.file);
    const pdf = await readFile(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${handbook.downloadName}"`);
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).send(pdf);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return res.status(503).json({ error: "This handbook is being prepared. Please try again shortly." });
    }
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
