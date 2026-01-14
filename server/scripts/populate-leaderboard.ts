import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import TestModel from "../src/models/Test";
import { v4 as uuidv4 } from "uuid";

const rootEnvPath = path.resolve(__dirname, "../../.env");
dotenv.config({ path: rootEnvPath });

const USERNAMES = [
  "typingMaster",
  "speedDemon",
  "keyboardWarrior",
  "fastFingers",
  "wordWizard",
  "typingNinja",
  "speedRacer",
  "quickKeys",
  "rapidTypist",
  "lightningFingers",
  "aceTyper",
  "proTypist",
  "speedKing",
  "wordMaster",
  "typingPro",
  "fastTyper",
  "keyboardHero",
  "typingElite",
  "speedStar",
  "wordChampion",
  "typingAce",
  "rapidFire",
  "quickType",
  "speedDemon",
  "typingLegend",
  "keyboardMaster",
  "fastHands",
  "typingGuru",
  "speedWizard",
  "wordSmith",
  "typingChamp",
  "rapidKeys",
  "quickFingers",
  "speedLord",
  "typingGod",
  "keyboardKing",
  "fastFeet",
  "typingStar",
  "speedElite",
  "wordGenius",
  "typingHero",
  "rapidHands",
  "quickMind",
  "speedPro",
  "typingBeast",
  "keyboardAce",
  "fastBrain",
  "typingWhiz",
  "speedChamp",
  "wordExpert",
];

function loadWords(): string[] {
  const wordsPath = path.resolve(__dirname, "../src/data/words.txt");
  const wordsContent = fs.readFileSync(wordsPath, "utf-8");
  return wordsContent.split("\n").filter((word) => word.trim().length > 0);
}

function generatePrompt(words: string[], wordCount: number = 50): string {
  const selectedWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWords.push(words[randomIndex]);
  }
  return selectedWords.join(" ");
}

function generateUsername(): string {
  return (
    USERNAMES[Math.floor(Math.random() * USERNAMES.length)] +
    Math.floor(Math.random() * 1000).toString()
  );
}

function generateFirebaseID(): string {
  return uuidv4();
}

function generateWPM(): number {
  const rand = Math.random();
  if (rand < 0.1) {
    return Math.floor(Math.random() * 20) + 20;
  } else if (rand < 0.8) {
    return Math.floor(Math.random() * 40) + 40;
  } else if (rand < 0.95) {
    return Math.floor(Math.random() * 40) + 80;
  } else {
    return Math.floor(Math.random() * 30) + 120;
  }
}

function generateAccuracy(): number {
  const rand = Math.random();
  if (rand < 0.1) {
    return parseFloat((Math.random() * 15 + 70).toFixed(2));
  } else if (rand < 0.8) {
    return parseFloat((Math.random() * 13 + 85).toFixed(2));
  } else {
    return parseFloat((Math.random() * 2 + 98).toFixed(2));
  }
}

function generateSeconds(): number {
  const rand = Math.random();
  if (rand < 0.1) {
    return Math.floor(Math.random() * 20) + 10;
  } else if (rand < 0.8) {
    return Math.floor(Math.random() * 30) + 30;
  } else {
    return Math.floor(Math.random() * 60) + 60;
  }
}

function calculateTestFields(
  wpm: number,
  accuracy: number,
  seconds: number,
  prompt: string
) {
  const promptWords = prompt.split(" ");
  const totalWords = promptWords.length;

  const wordsTyped = Math.floor((wpm * seconds) / 60);

  const accuracyDecimal = accuracy / 100;
  const wordMistakes = Math.floor(wordsTyped * (1 - accuracyDecimal));

  const promptChars = prompt.length;
  const charsTyped = Math.min(wordsTyped * 5, promptChars);
  const charMistakes = Math.floor(charsTyped * (1 - accuracyDecimal));

  return {
    wordsTyped: Math.max(1, wordsTyped),
    wordMistakes: Math.max(0, wordMistakes),
    charsTyped: Math.max(1, charsTyped),
    charMistakes: Math.max(0, charMistakes),
  };
}

function generateTest(words: string[]): any {
  const wpm = generateWPM();
  const accuracy = generateAccuracy();
  const seconds = generateSeconds();
  const wordCount = Math.floor(Math.random() * 30) + 20;
  const prompt = generatePrompt(words, wordCount);

  const calculatedFields = calculateTestFields(wpm, accuracy, seconds, prompt);

  return {
    firebaseID: generateFirebaseID(),
    displayName: generateUsername(),
    wpm: parseFloat(wpm.toFixed(2)),
    accuracy: accuracy,
    prompt: prompt,
    wordsTyped: calculatedFields.wordsTyped,
    wordMistakes: calculatedFields.wordMistakes,
    charsTyped: calculatedFields.charsTyped,
    charMistakes: calculatedFields.charMistakes,
    seconds: seconds,
  };
}

async function populateLeaderboard(count: number = 100) {
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
    console.log("Successfully connected to MongoDB");

    console.log("Loading words...");
    const words = loadWords();
    console.log(`Loaded ${words.length} words`);

    console.log(`Generating ${count} test entries...`);
    const tests = [];
    for (let i = 0; i < count; i++) {
      tests.push(generateTest(words));
      if ((i + 1) % 10 === 0) {
        console.log(`Generated ${i + 1}/${count} tests...`);
      }
    }

    console.log("Inserting tests into database...");
    await TestModel.insertMany(tests);
    console.log(
      `Successfully inserted ${count} test entries into the leaderboard!`
    );

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error populating leaderboard:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

const count = process.argv[2] ? parseInt(process.argv[2], 10) : 100;

if (isNaN(count) || count <= 0) {
  console.error("Invalid count. Please provide a positive number.");
  process.exit(1);
}

console.log(`Starting to populate leaderboard with ${count} test entries...\n`);
populateLeaderboard(count);
