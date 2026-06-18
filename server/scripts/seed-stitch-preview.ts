/**
 * Seeds MongoDB with themes and sample leaderboard data for Stitch HTML capture.
 * Idempotent: skips collections that already have documents.
 *
 * Usage: npx ts-node scripts/seed-stitch-preview.ts
 */
import mongoose from "mongoose";
import { config } from "../src/utils/config";
import ThemeModel from "../src/models/Theme";
import TestModel from "../src/models/Test";
import { defaultTestPrompt } from "../src/tests/setup/test.utils";

const PREVIEW_THEMES = [
  {
    name: "dark",
    primaryColor: "#636669",
    secondaryColor: "#D6985C",
    backgroundColor: "#333437",
    primaryDark: "#2B2E31",
    primaryLight: "#636669",
  },
  {
    name: "cafe",
    primaryColor: "#dda15e",
    secondaryColor: "#fefae0",
    backgroundColor: "#763F0E",
    primaryDark: "#283618",
    primaryLight: "#606c38",
  },
  {
    name: "pine",
    primaryColor: "#dad7cd",
    secondaryColor: "#a3b18a",
    backgroundColor: "#588157",
    primaryDark: "#3a5a40",
    primaryLight: "#344e41",
  },
];

const PREVIEW_LEADERBOARD = [
  { displayName: "SwiftTyper", wpm: 142.5, accuracy: 98.2 },
  { displayName: "KeyNinja", wpm: 128.3, accuracy: 96.8 },
  { displayName: "WordRunner", wpm: 115.7, accuracy: 94.5 },
  { displayName: "TypeMaster", wpm: 108.2, accuracy: 97.1 },
  { displayName: "ShibaFan", wpm: 95.4, accuracy: 92.3 },
  { displayName: "CoffeeCoder", wpm: 88.6, accuracy: 91.0 },
  { displayName: "PineTypist", wpm: 82.1, accuracy: 89.5 },
  { displayName: "NightOwl", wpm: 76.3, accuracy: 88.2 },
  { displayName: "BeginnerBob", wpm: 65.8, accuracy: 85.0 },
  { displayName: "NewbieNina", wpm: 52.4, accuracy: 82.7 },
];

async function seed(): Promise<void> {
  if (!config.uri) {
    throw new Error("URI is not set. Configure MongoDB in the root .env file.");
  }

  await mongoose.connect(config.uri);

  const themeCount = await ThemeModel.countDocuments();
  if (themeCount === 0) {
    await ThemeModel.insertMany(PREVIEW_THEMES);
    console.log(`Seeded ${PREVIEW_THEMES.length} themes`);
  } else {
    console.log(`Themes already present (${themeCount}), skipping`);
  }

  const testCount = await TestModel.countDocuments();
  if (testCount === 0) {
    const prompt = defaultTestPrompt;
    const wordsTyped = prompt.split(" ").length;
    await TestModel.insertMany(
      PREVIEW_LEADERBOARD.map((entry, index) => ({
        firebaseID: `stitch-preview-${index}`,
        displayName: entry.displayName,
        wpm: entry.wpm,
        accuracy: entry.accuracy,
        prompt,
        wordsTyped,
        wordMistakes: 2,
        charsTyped: prompt.length,
        charMistakes: 3,
        seconds: 60,
      }))
    );
    console.log(`Seeded ${PREVIEW_LEADERBOARD.length} leaderboard entries`);
  } else {
    console.log(`Tests already present (${testCount}), skipping`);
  }

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
