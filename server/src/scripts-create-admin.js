
import "dotenv/config";

import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";

async function createAdmin() {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in server/.env."
      );
    }

    if (ADMIN_PASSWORD.length < 12) {
      throw new Error("ADMIN_PASSWORD must be at least 12 characters long.");
    }

    await connectDB();

    const email = ADMIN_EMAIL.trim().toLowerCase();
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`An admin account already exists for ${email}.`);
      console.log("No account was changed.");
      return;
    }

    const admin = await Admin.create({
      name: ADMIN_NAME.trim(),
      email,
      password: ADMIN_PASSWORD,
    });

    console.log(`Admin account created successfully for ${admin.email}.`);
  } catch (error) {
    console.error("Could not create admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

createAdmin();
