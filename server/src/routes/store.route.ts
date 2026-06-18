import { Router } from "express";
import { Routes } from "../interfaces/app.interface";
import { Theme } from "../interfaces/store.interface";
import ThemeModel from "../models/Theme";
import {
  isStitchPreview,
  STITCH_PREVIEW_THEMES,
} from "../data/stitch-preview";

export default class StoreRoute implements Routes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/api/store/themes", async (req, res) => {
      if (isStitchPreview()) {
        return res.status(200).json({ themes: STITCH_PREVIEW_THEMES });
      }

      try {
        const themes: Theme[] = await ThemeModel.find();
        res.status(200).json({ themes });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        res.status(500).send({
          message: "Internal Server Error",
          error: errorMessage,
        });
      }
    });
  }
}
