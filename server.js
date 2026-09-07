import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gradeHandler from "./api/grade.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.post("/api/grade", gradeHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Grading server running on port ${PORT}`));
