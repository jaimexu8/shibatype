import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firebaseID: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tests: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
