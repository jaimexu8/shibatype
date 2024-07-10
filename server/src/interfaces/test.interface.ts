import mongoose from "mongoose";

export default interface CreateTestData {
  firebaseID: string;
  prompt: string;
  wordsTyped: number;
  wordMistakes: number;
  charsTyped: number;
  charMistakes: number;
  seconds: number;
}
