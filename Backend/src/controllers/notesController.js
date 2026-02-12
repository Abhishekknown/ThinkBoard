import mongoose from "mongoose";
import Note from "../model/notes.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createAt: 1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log("Error in getallnotes", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "internal sshystem error" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ message: "Note Created Successfully" });
  } catch (error) {
    console.error("Its an error in createNotes functions", error);
    res.status(500).json({ message: "its an error" });
  }
};

export const updatedNotes = async (req, res) => {
  //  what need to be chanegd and selected come first

  // now what need to be updated
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
      },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note Not Found" });

    res.status(201).json({ message: "Update Notes successfull" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Note.findByIdAndDelete({ _id: id });
    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(201).json({ message: "good job delete hogaya hai ab" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server eerror" });
  }
};
