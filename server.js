import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithRetry(prompt, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
      return response;
    } catch (err) {
      const isOverloaded = err.message?.includes("UNAVAILABLE") || err.message?.includes("503");
      if (isOverloaded && attempt < maxRetries) {
        const delay = attempt * 1000;
        console.log(`Model overloaded, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`);
        await sleep(delay);
        continue;
      }
      throw err;
    }
  }
}

app.post("/api/grade", async (req, res) => {
  try {
    const { code, visualDiffScore, a11yViolations, challengeBrief } = req.body;

    if (!code || visualDiffScore === undefined || !a11yViolations) {
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
  Don't overwhelm with minor details when core functionality or structure is broken.
- If overallScore is 50-79: mention the 1-2 most important fixes, plus one or two
  secondary improvements worth considering.
- If overallScore is 80-99: focus on refinement and polish - edge cases,
  minor accessibility improvements, or code elegance, since the fundamentals are solid.
- If overallScore is 100: do not invent flaws. Acknowledge specifically what the
  submission did well and confirm there are no meaningful issues to fix.

Respond with ONLY valid JSON, no markdown, no preamble, in this exact shape:
{
  "scores": { "visual": 0-100, "responsive": 0-100, "accessibility": 0-100, "codeQuality": 0-100 },
  "weights": { "visual": 0-1, "responsive": 0-1, "accessibility": 0-1, "codeQuality": 0-1 },
  "overallScore": 0-100,
  "reasoning": "2-3 sentences explaining the weighting and either the most important thing to fix, or, if the score is excellent, what the submission did particularly well"
}`;

    const response = await generateWithRetry(prompt);
    const responseText = response.text;
    const cleaned = responseText.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed. Raw model response was:");
      console.error(responseText);
      return res.status(502).json({
        error: "Model returned malformed JSON",
        rawResponse: responseText,
      });
    }

    res.json(parsed);
  } catch (err) {
    console.error("Grading error:", err);
    res.status(500).json({ error: "Grading failed", details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Grading server running on port ${PORT}`));