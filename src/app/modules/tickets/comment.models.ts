import { Schema, model } from "mongoose";
import { IComment } from "./ticket.interface";

const commentSchema = new Schema<IComment>(
  {
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Comment = model<IComment>("Comment", commentSchema);
