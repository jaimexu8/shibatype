import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    primaryColor: {
      type: String,
      required: true,
    },
    secondaryColor: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    primaryDark: {
      type: String,
      required: true,
    },
    primaryLight: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ThemeModel = mongoose.model("themes", ThemeSchema);
export default ThemeModel;
