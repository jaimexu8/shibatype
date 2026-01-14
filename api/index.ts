import type { VercelRequest, VercelResponse } from "@vercel/node";
import express, { Express } from "express";
import cors from "cors";
import { connectToDatabase } from "./db";
import UserRoute from "../server/src/routes/user.route";
import TestRoute from "../server/src/routes/test.route";
import StoreRoute from "../server/src/routes/store.route";

let cachedApp: Express | null = null;

function getApp(): Express {
  if (cachedApp) {
    return cachedApp;
  }

  const app = express();

  app.use(cors());
  app.use(express.json());

  const userRoute = new UserRoute();
  const testRoute = new TestRoute();
  const storeRoute = new StoreRoute();

  app.use("/", userRoute.router);
  app.use("/", testRoute.router);
  app.use("/", storeRoute.router);

  cachedApp = app;
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`API request: ${req.method} ${req.url}`);

  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }

  try {
    const app = getApp();
    return app(req as any, res as any);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
