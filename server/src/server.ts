import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Routes } from "./interfaces/app.interface";
import { config } from "./utils/config";

export default class App {
  public app: express.Application;
  public env: string = process.env.NODE_ENV || "development";
  public port: string = process.env.PORT || "3000";

  constructor(routes: Routes[]) {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());

    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  public async connectToDatabase() {
    if (!config.uri) {
      console.error(
        "MongoDB URI is not configured. Please set the URI environment variable."
      );
      return;
    }

    const maxRetries = 5;
    const retryDelay = 5000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await mongoose.connect(config.uri);
        console.log("Successfully connected to MongoDB");
        return;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(
          `Error connecting to database (attempt ${attempt}/${maxRetries}):`,
          errorMessage
        );

        if (attempt < maxRetries) {
          console.log(`Retrying in ${retryDelay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          console.error(
            "Failed to connect to database after all retries. Server will continue but database features may not work."
          );
        }
      }
    }
  }

  public async listen() {
    return this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}
