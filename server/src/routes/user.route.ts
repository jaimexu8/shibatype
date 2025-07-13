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
    this.router.get("/api/user/theme/:firebaseID", async (req, res) => {
      try {
        const firebaseID = req.params.firebaseID;
        const user = await UserModel.findOne({ firebaseID });
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(user.selectedTheme);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
    this.router.post(
      "/api/user/selectTheme/:firebaseID/:theme",
      async (req, res) => {
        try {
          const firebaseID = req.params.firebaseID;
          const user = await UserModel.findOne({ firebaseID });
          if (!user) {
            return res.status(404).send({ message: "User not found" });
          }
          user.selectedTheme = req.params.theme;
          await user.save();
          return res.status(200).send({
            message: "Theme updated successfully",
            theme: user.selectedTheme,
          });
        } catch (error) {
          res
            .status(500)
            .send({ message: "Internal Server Error", error: error.message });
        }
      }
    );
    this.router.put("/api/user/unlockTheme/:firebaseID", async (req, res) => {
      try {
        const firebaseID = req.params.firebaseID;
        const updateData = req.body;
        const updatedUser = await UserModel.findOneAndUpdate(
          { firebaseID },
          updateData,
          { new: true }
        );
        if (!updatedUser) {
          return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send(updatedUser);
      } catch (error) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
    this.router.put("/api/user/addCoins/:firebaseID", async (req, res) => {
      try {
        const firebaseID = req.params.firebaseID;
        const { coinsToAdd } = req.body;

        if (!coinsToAdd || typeof coinsToAdd !== "number" || coinsToAdd < 0) {
          return res.status(400).send({ message: "Invalid coins amount" });
        }

        const user = await UserModel.findOne({ firebaseID });
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }

        user.coins += coinsToAdd;
        await user.save();

        res.status(200).send({
          message: "Coins added successfully",
          coins: user.coins,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
  }
}
