import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    totalWords: {
      type: Number,
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
    wordAccuracy: {
      type: Number,
      required: true,
    },
    totalChars: {
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
    charAccuracy: {
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
