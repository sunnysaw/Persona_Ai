import mongoose from "mongoose";

const oAuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is missing"],
    },
    email: {
      type: String,
      required: [true, "email is missing"],
      unique: true,
      index: true,
    },
    picture: {
      type: String,
      required: [true, "picture is missing"],
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const oAuthModel =  mongoose.model("oAuthModel", oAuthSchema);

export default oAuthModel;
