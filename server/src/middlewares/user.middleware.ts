import { Request, Response, NextFunction } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const firebaseID = req.body.firebaseID;
  if (!firebaseID) {
    return res.status(400).send({ message: "Firebase ID is required." });
  }

  const displayName = req.body.displayName;
  if (!displayName) {
    return res.status(400).send({ message: "Display name is required." });
  }

  const email = req.body.email;
  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }

  next();
};
