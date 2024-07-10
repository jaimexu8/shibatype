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
  }
}
