import { Request, Response, NextFunction } from "express";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uid = req.body.uid;
  if (!uid) {
    return res.status(400).send({ message: "UID is required." });
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
