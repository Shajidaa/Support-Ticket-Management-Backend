import { Schema, model } from "mongoose";
import { ITicket } from "./ticket.interface";

const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: [true, "Ticket title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Ticket description is required"],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const Ticket = model<ITicket>("Ticket", ticketSchema);
