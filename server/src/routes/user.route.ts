import { Router } from "express";
import UserModel from "../models/User";
import { validateUser } from "../middlewares/user.middleware";
import { Routes } from "../interfaces/app.interface";

export default class UserRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/api/user/", validateUser, async (req, res) => {
      try {
        const user = new UserModel({
          ...req.body,
          tests: [],
        });
        await user.save();
        res.status(201).send(user);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
    this.router.get("/api/user/:firebaseID", async (req, res) => {
      try {
        const firebaseID = req.params.firebaseID;
        const user = await UserModel.findOne({ firebaseID });
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
  }
}
