import { Router } from "express";
import TestModel from "../models/Test";
import UserModel from "../models/User";
import { validateTest } from "../middlewares/test.middleware";
import { Routes } from "../interfaces/app.interface";

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
  }
}
