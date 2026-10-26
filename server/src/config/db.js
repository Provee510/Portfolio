
import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri.includes("PASTE_YOUR_")) {
    throw new Error(
      "MONGODB_URI is missing. Add your MongoDB Atlas connection string to server/.env."
    );
  }

  await mongoose.connect(mongoUri);

  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
