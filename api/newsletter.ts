import { readFile } from "node:fs/promises";
import path from "node:path";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_LIST_ID = 2;

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
          SOURCE: "ML Academy Interview Cheatsheet",
        },
      }),
    });

    if (brevoResponse.status !== 201 && brevoResponse.status !== 204) {
      return res.status(502).json({ error: "We could not save your signup. Please try again." });
    }

    const pdfPath = path.join(process.cwd(), "private", "ML_Interview_Cheatsheet.pdf");
    const pdf = await readFile(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="ML_Interview_Cheatsheet.pdf"');
    res.setHeader("Cache-Control", "private, no-store");
    return res.status(200).send(pdf);
  } catch {
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
