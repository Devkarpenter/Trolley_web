// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL not set in env");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME || "trolleyStore",
      // useNewUrlParser: true, // not needed with newer mongoose
      // useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
};
