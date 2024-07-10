import mongoose from "mongoose";

export interface User {
  _id: mongoose.Schema.Types.ObjectId;
  firebaseID: string;
  displayName: string;
  email: string;
  tests: mongoose.Schema.Types.ObjectId[];
}

export interface CreateUserData {
  firebaseID: string;
  displayName: string;
  email: string;
}
