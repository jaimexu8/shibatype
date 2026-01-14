import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import TestModel from "../src/models/Test";
import UserModel from "../src/models/User";

const rootEnvPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: rootEnvPath });

async function wipeAllTests() {
  try {
    const uri = process.env.URI;
    if (!uri) {
      console.error(
        "MongoDB URI is not configured. Please set the URI environment variable in .env"
      );
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB\n");

    const testCount = await TestModel.countDocuments();
    console.log(`Found ${testCount} test entries in the database`);

    if (testCount === 0) {
      console.log("No tests to delete. Database is already empty.");
      await mongoose.connection.close();
      console.log("Database connection closed");
      return;
    }

    console.log("Deleting all test entries...");
    const deleteResult = await TestModel.deleteMany({});
    console.log(`✓ Deleted ${deleteResult.deletedCount} test entries`);

    console.log("Clearing test references from user accounts...");
    const userUpdateResult = await UserModel.updateMany(
      {},
      { $set: { tests: [] } }
    );
    console.log(
      `✓ Cleared test references from ${userUpdateResult.modifiedCount} user accounts`
    );

    const remainingTests = await TestModel.countDocuments();
    if (remainingTests === 0) {
      console.log("\n✓ Successfully wiped all test data!");
      console.log("  - All test entries deleted");
      console.log("  - All user test references cleared");
      console.log("  - Leaderboard is now empty");
    } else {
      console.warn(
        `\n⚠ Warning: ${remainingTests} test entries still remain in the database`
      );
    }

    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  } catch (error) {
    console.error("Error wiping tests:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

console.log("=".repeat(60));
console.log("WIPE ALL TESTS - DESTRUCTIVE OPERATION");
console.log("=".repeat(60));
console.log("This will permanently delete ALL test data from the database.");
console.log("This action cannot be undone!\n");

wipeAllTests();
