import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    firebaseID: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    wpm: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    wordsTyped: {
      type: Number,
      required: true,
    },
    wordMistakes: {
      type: Number,
      required: true,
    },
    charsTyped: {
      type: Number,
      required: true,
    },
    charMistakes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const TestModel = mongoose.model("tests", TestSchema);
export default TestModel;
