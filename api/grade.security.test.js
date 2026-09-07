import test from "node:test";
import assert from "node:assert/strict";
import gradeHandler, { normalizeModelResult, runServerChecks, validateGradePayload } from "./grade.js";

const validPayload = {
  challengeId: "challenge-1-pricing-card",
  submission: { html: "<main>Hello</main>", css: "", js: "", jsx: "" },
};

test("accepts only a challenge ID and code buffers", () => {
  assert.deepEqual(validateGradePayload(validPayload), validPayload);
});

test("rejects browser-supplied scoring inputs", () => {
  assert.throws(
    () => validateGradePayload({ ...validPayload, visualDiffScore: 100 }),
    /Unexpected grading field/,
  );
  assert.throws(
    () => validateGradePayload({ ...validPayload, scores: { visual: 100 } }),
    /Unexpected grading field/,
  );
});

test("rejects unknown formats, extra buffers, and oversized code", () => {
  assert.throws(() => validateGradePayload({ ...validPayload, challengeId: "challenge-999-admin" }), /Invalid challenge ID/);
  assert.throws(
    () => validateGradePayload({ ...validPayload, submission: { ...validPayload.submission, score: 100 } }),
    /Unexpected submission field/,
  );
  assert.throws(
    () => validateGradePayload({ ...validPayload, submission: { ...validPayload.submission, html: "x".repeat(40_001) } }),
    /size limit/,
  );
});

test("server calculates and clamps the authoritative score", () => {
  const result = normalizeModelResult({
    scores: { visual: 101, responsive: 80.4, accessibility: -2, codeQuality: 60 },
    overallScore: 100,
    weights: { visual: 1 },
    reasoning: "Useful feedback",
  });
  assert.deepEqual(result.scores, { visual: 100, responsive: 80, accessibility: 0, codeQuality: 60 });
  assert.deepEqual(result.weights, { visual: 0.35, responsive: 0.2, accessibility: 0.2, codeQuality: 0.25 });
  assert.equal(result.overallScore, 66);
});

test("accessibility checks run from submitted HTML on the server", () => {
  const violations = runServerChecks({ html: '<img src="x"><button></button><input id="email">', css: "", js: "", jsx: "" });
  assert.deepEqual(violations.map((item) => item.id), ["image-alt", "button-name", "form-label"]);
});

function mockResponse() {
  return {
    headers: {},
    statusCode: 200,
    payload: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(value) { this.statusCode = value; return this; },
    json(value) { this.payload = value; return this; },
  };
}

test("endpoint rejects requests without a signed-in user", async () => {
  const previousKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = "test-key";
  const response = mockResponse();
  await gradeHandler({ method: "POST", headers: { "content-type": "application/json" }, body: validPayload }, response);
  assert.equal(response.statusCode, 401);
  assert.match(response.payload.error, /Sign in/);
  if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = previousKey;
});

test("endpoint rejects non-JSON input", async () => {
  const previousKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = "test-key";
  const response = mockResponse();
  await gradeHandler({ method: "POST", headers: { "content-type": "text/plain" }, body: validPayload }, response);
  assert.equal(response.statusCode, 415);
  if (previousKey === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = previousKey;
});

test("endpoint rejects oversized requests before authentication or AI work", async () => {
  const response = mockResponse();
  await gradeHandler({
    method: "POST",
    headers: { "content-type": "application/json", "content-length": "153601" },
    body: validPayload,
  }, response);
  assert.equal(response.statusCode, 413);
});
