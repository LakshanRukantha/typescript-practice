import mongoose, { Schema } from "mongoose";

// Types for UserSchema
type UserSchema = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  method: "email" | "oauth";
};

const UserSchema = new Schema<UserSchema>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model for the User schema if it doesn't already exist and export it
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
