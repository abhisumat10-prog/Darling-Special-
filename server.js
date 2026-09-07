import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gradeHandler from "./api/grade.js";

dotenv.config();

const app = express();
const configuredOrigins = (process.env.CLIENT_ORIGIN || "").split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    if (!origin || configuredOrigins.includes(origin) || /^http:\/\/(?:127\.0\.0\.1|localhost):\d+$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin not allowed"));
  },
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "150kb", strict: true }));

app.post("/api/grade", gradeHandler);

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error?.type === "entity.too.large" ? 413 : 400;
  return res.status(status).json({ error: status === 413 ? "Request is too large" : "Invalid request" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Grading server running on port ${PORT}`));
