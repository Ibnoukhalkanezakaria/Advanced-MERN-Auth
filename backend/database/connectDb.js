import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log("mongo db url", process.env.MONGODB_URI);
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};
