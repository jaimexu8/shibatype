import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import TestModel from "./models/Test";
import UserModel from "./models/User";
import { validateUser } from "./middlewares/user.middleware";
import { validateTest } from "./middlewares/test.middleware";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
mongoose.connect(process.env.URI || "");

// Create new user
app.post("/api/users", validateUser, async (req: Request, res: Response) => {
  try {
    const user = new UserModel({
      ...req.body,
      tests: [],
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error." });
  }
});

// Upload test results
app.post("/api/tests", validateTest, async (req: Request, res: Response) => {
  try {
    const test = new TestModel(req.body);
    await test.save();
    res.status(201).send(test);
  } catch (error) {
    res.status(500).send({ message: "Server error." });
  }
});

// Add test result to user
app.post("/api/users/:id/tests", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const testId = req.body.testId;
  if (!userId || !testId) {
    return res
      .status(400)
      .send({ message: "User ID and Test ID are required." });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    user.tests.push(testId);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Server error." });
  }
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running: ${process.env.PORT}`);
});
