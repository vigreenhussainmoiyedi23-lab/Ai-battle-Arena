import mongoose from "mongoose";
import config from "./config.js";

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

async function ConnectToDb(retries = MAX_RETRIES): Promise<void> {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(config.MONGO_URI);

    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection failed");

    if (retries > 0) {
      console.log(
        `Retrying in ${RETRY_DELAY / 1000}s... (${retries} retries left)`
      );

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));

      return ConnectToDb(retries - 1);
    }

    console.error("Failed to connect after multiple attempts.");
    process.exit(1);
  }
}

export default ConnectToDb;