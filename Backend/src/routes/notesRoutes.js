import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  updatedNotes,
  getNoteById,
} from "../controllers/notesController.js";

const routes = express.Router();
routes.get("/:id", getNoteById);
routes.get("/", getAllNotes);
routes.post("/", createNotes);
routes.put("/:id", updatedNotes);
routes.delete("/:id", deleteNotes);

export default routes;
