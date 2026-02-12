import express from "express";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("PASSED AND CONNECTED");
  } catch (error) {
    console.error("Failed Damit", error);
    process.exit(1);
  }
};

export default connectDB;

// mongodb+srv://abhishekmanjhi:nyeQLw2ETzs2FYhJ@musicplayer.arwtavo.mongodb.net/?appName=MusicPlayer
