import { Types } from "mongoose";

export type TStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TPriority = "Low" | "Medium" | "High";

export interface ITicket {
  title: string;
  description: string;
  status: TStatus;
  priority: TPriority;
  customer: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
