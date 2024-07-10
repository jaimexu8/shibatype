import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { Routes } from "./interfaces/app.interface";
import { config } from "./utils/config";

export default class App {
  public app: express.Application;
  public env: string;
  public port: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());

    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  public async connectToDatabase() {
    try {
      await mongoose.connect(config.uri || "");
    } catch (error) {
      console.error("Error connecting to database", error);
      process.exit(1);
    }
  }

  public async listen() {
    return this.app.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });
  }
}
