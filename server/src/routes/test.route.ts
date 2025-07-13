import { Router } from "express";
import { Routes } from "../interfaces/app.interface";
import {
  validateTest,
  validateTestLeaderboard,
  validateTestPrompt,
} from "../middlewares/test.middleware";
import TestModel from "../models/Test";
import UserModel from "../models/User";
import fs from "fs";
import path from "path";

export default class TestRoute implements Routes {
  public router = Router();
  private words: string[] = [];

  constructor() {
    this.loadWords();
    this.initializeRoutes();
  }

  private loadWords() {
    const WORDS_FILE_PATH = path.join(__dirname, "../data/words.txt");
    fs.readFile(WORDS_FILE_PATH, "utf8", (err, data) => {
      if (err) {
        console.error("Error loading words:", err);
        return;
      }
      this.words = data.split("\n").filter((word) => word.trim().length > 0);
    });
  }

  private getRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  private initializeRoutes() {
    this.router.post("/api/test/", validateTest, async (req, res) => {
      try {
        const user = await UserModel.findOne({
          firebaseID: req.body.firebaseID,
        });
        if (!user) {
          return res.status(405).send({ message: "User not found." });
        }

        const test = new TestModel(req.body);
        await test.save();

        user.tests.push(test._id);
        await user.save();

        res.status(201).send(test);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
    this.router.get(
      "/api/test/prompt/",
      validateTestPrompt,
      async (req, res) => {
        try {
          const wordCount = parseInt(req.query.wordCount as string, 10);
          let prompt = this.getRandomWord();
          for (let i = 1; i < wordCount; i++) {
            prompt += " " + this.getRandomWord();
          }
          res.status(201).send({ prompt });
        } catch (error) {
          res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
          });
        }
      }
    );
    this.router.get(
      "/api/test/leaderboard/",
      validateTestLeaderboard,
      async (req, res) => {
        try {
          const sortOrder = parseInt(req.query.sortOrder as string, 10);
          const validatedSortOrder: 1 | -1 = sortOrder === -1 ? -1 : 1;

          const count = parseInt(req.query.count as string, 10);

          const tests = await TestModel.find(
            {},
            { displayName: 1, wpm: 1, accuracy: 1, createdAt: 1 }
          )
            .sort({ wpm: validatedSortOrder })
            .limit(count);

          const formattedTests = tests.map((test) => ({
            displayName: test.displayName,
            wpm: test.wpm,
            accuracy: test.accuracy,
            testDate: test.createdAt.toISOString().split("T")[0],
          }));

          res.status(201).send(formattedTests);
        } catch (error) {
          res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
          });
        }
      }
    );
    this.router.get("/api/test/user/:firebaseID", async (req, res) => {
      try {
        const firebaseID = req.params.firebaseID;
        const tests = await TestModel.find({ firebaseID })
          .sort({ createdAt: -1 })
          .select("wpm accuracy createdAt seconds wordsTyped");

        const formattedTests = tests.map((test) => ({
          wpm: test.wpm,
          accuracy: test.accuracy,
          date: test.createdAt.toISOString().split("T")[0],
          seconds: test.seconds,
          wordsTyped: test.wordsTyped,
        }));

        res.status(200).send(formattedTests);
      } catch (error) {
        res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    });
  }
}
