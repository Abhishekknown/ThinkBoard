import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

/* ---------------- MIDDLEWARE ---------------- */

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(ratelimiter);

/* ---------------- API ROUTES ---------------- */

app.use("/api/notes", notesRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server running" });
});

/* ---------------- PRODUCTION FRONTEND ---------------- */

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  // ✅ catch-all without path-to-regexp wildcard
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

/* ---------------- START SERVER ---------------- */

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on PORT", PORT);
  });
});
