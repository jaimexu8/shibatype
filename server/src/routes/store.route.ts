import { Router } from "express";
import { Routes } from "../interfaces/app.interface";
import { Theme } from "../interfaces/store.interface";
import ThemeModel from "../models/Theme";

export default class StoreRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/api/store/themes", async (req, res) => {
      try {
        const themes: Theme[] = await ThemeModel.find();
        res.status(200).json({ themes });
      } catch (error) {
        res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    });
  }
}
