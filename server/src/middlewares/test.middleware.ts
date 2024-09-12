import { Request, Response, NextFunction } from "express";

export const validateTest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

export const validateTestLeaderboard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
