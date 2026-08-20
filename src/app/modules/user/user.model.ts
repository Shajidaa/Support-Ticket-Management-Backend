import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["Customer", "Staff"], default: "Customer" },
  },
  { versionKey: false },
);

export const User = model<IUser>("User", userSchema);
