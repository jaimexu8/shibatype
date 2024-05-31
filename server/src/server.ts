import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import TestModel from "./models/Test";
import UserModel from "./models/User";

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

// MongoDB connection
dotenv.config();
mongoose.connect(process.env.URI || "");
app.use(bodyParser.json());

// Sign up new user
app.post("/api/users", async (req: Request, res: Response) => {
  const firebaseUid = req.body.firebaseUid;
  if (!firebaseUid) {
    return res.status(400).send({ message: "Firebase UID is required." });
  }
  const username = req.body.username;
  if (!username) {
    return res.status(400).send({ message: "Username is required." });
  }
  try {
    const user = new UserModel({
      _id: firebaseUid,
      username: username,
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
app.post("/api/tests", async (req: Request, res: Response) => {
  const test = req.body;
  if (!test) {
    return res.status(400).send({ message: "Test data is required." });
  }
  try {
    const newTest = new TestModel(test);
    await newTest.save();
    res.status(201).send(newTest);
    // TODO: Check if high score
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
