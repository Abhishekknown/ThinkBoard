import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
const app = express();
import dotenv from "dotenv";

import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
const MONGODB = process.env.MONGODB;
app.use(cors());
app.use(express.json());
app.use(ratelimiter);

// what is endpoint?
// An endpoint is a combination of a URL + HTTP method that let the client interact with specific resourse

app.use("/api/notes", notesRoutes);
app.get("/", (req, res) => {
  (res.status(201), json({ message: "running" }));
});
// this is the routes
console.log("PORT =", PORT);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Started on PORT", PORT);
  });
});
// app.listen(PORT, () => {
//   console.log("its running bitch");
// });
