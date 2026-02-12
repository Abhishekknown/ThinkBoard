import express from "express";

import mongoose from "mongoose";
// 1st create  a schema
// 2nd model based off the schema

const noteScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
); // CreateAT, updatedAT

const Note = mongoose.model("note", noteScheme);

export default Note;
