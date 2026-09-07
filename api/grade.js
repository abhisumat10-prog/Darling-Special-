import { GoogleGenAI } from "@google/genai";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithRetry(ai, prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isRetryable = /UNAVAILABLE|429|500|502|503|504/i.test(message);

      if (isRetryable && attempt < maxRetries) {
        await sleep(attempt * 1000);
        continue;
      }

      throw error;
    }
  }
}

export default async function gradeHandler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: "AI grading is not configured" });
  }

  try {
    const { code, visualDiffScore, a11yViolations, challengeBrief } = req.body || {};

    if (!code || visualDiffScore === undefined || !Array.isArray(a11yViolations)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `You are a senior frontend engineer grading a UI challenge submission.

Challenge brief: ${challengeBrief || "General UI challenge"}

Grade on four signals: visual accuracy, responsive behavior, accessibility, and code quality.
For code quality, evaluate both semantic correctness (right HTML elements, structure, maintainability)
AND efficiency (unnecessary re-renders, redundant DOM queries, unoptimized loops, or other wasteful patterns).
Decide the weight of each signal yourself based on what this specific challenge needs.

Submitted code:
\`\`\`
${code}
\`\`\`

Visual diff score: ${visualDiffScore}/100

Accessibility violations:
${JSON.stringify(a11yViolations, null, 2)}

Calibrate your reasoning to the overall score level:
- If overallScore is below 50: focus only on the most critical, foundational issues.
- If overallScore is 50-79: mention the 1-2 most important fixes and secondary improvements.
- If overallScore is 80-99: focus on refinement, edge cases, accessibility, and code elegance.
- If overallScore is 100: do not invent flaws; confirm what the submission did well.

Respond with ONLY valid JSON, no markdown, no preamble, in this exact shape:
{
  "scores": { "visual": 0-100, "responsive": 0-100, "accessibility": 0-100, "codeQuality": 0-100 },
  "weights": { "visual": 0-1, "responsive": 0-1, "accessibility": 0-1, "codeQuality": 0-1 },
  "overallScore": 0-100,
  "reasoning": "2-3 sentences explaining the result"
}`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await generateWithRetry(ai, prompt);
    const responseText = response.text || "";
    const cleaned = responseText.replace(/```json|```/g, "").trim();

    try {
      return res.json(JSON.parse(cleaned));
    } catch {
      console.error("Grading model returned malformed JSON");
      return res.status(502).json({ error: "AI returned an invalid response. Please retry." });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Grading error:", message);
    return res.status(500).json({ error: "AI grading failed. Please retry." });
  }
}
