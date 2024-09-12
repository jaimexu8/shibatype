import { Router } from "express";
import { Routes } from "../interfaces/app.interface";
import {
  validateTest,
  validateTestLeaderboard,
} from "../middlewares/test.middleware";
import TestModel from "../models/Test";
import UserModel from "../models/User";

export default class TestRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/api/test/", validateTest, async (req, res) => {
      try {
        const user = await UserModel.findOne({
          firebaseID: req.body.firebaseID,
        });
        if (!user) {
          return res.status(404).send({ message: "User not found." });
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
      "/api/test/leaderboard/",
      validateTestLeaderboard,
      async (req, res) => {
        try {
          const sortOrder = parseInt(req.query.sortOrder as string, 10);
          const validatedSortOrder: 1 | -1 = sortOrder === -1 ? -1 : 1;

          const count = parseInt(req.query.count as string, 10);

          const tests = await TestModel.find(
            {},
            { firebaseID: 1, seconds: 1, createdAt: 1 }
          )
            .sort({ seconds: validatedSortOrder })
            .limit(count);

          const formattedTests = tests.map((test) => ({
            firebaseID: test.firebaseID,
            seconds: test.seconds,
            testDate: test.createdAt.toISOString().split("T")[0],
          }));

          res.status(200).send(formattedTests);
        } catch (error) {
          res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
          });
        }
      }
    );
  }
}
