import { AppError } from "../../errors/AppError";
import { Comment } from "./comment.models";
import { ITicket } from "./ticket.interface";
import { Ticket } from "./ticket.model";

const createdTicketDb = async (payload: ITicket, customerId: string) => {
  const { title, description, priority } = payload;

  const ticket = await Ticket.create({
    title,
    description,
    status: "Open",
    priority,
    customer: customerId,
  });
  return ticket;
};
const getAllTicket = async (query: any, customerId: string, role: string) => {
  const { status, priority, assignedTo } = query;

  const filter: any = {};

  if (role === "Customer") {
    filter.customer = customerId;
    if (status) filter.status = status;
  } else {
    if (status) {
      filter.status = status;
    } else {
      filter.status = { $in: ["Open", "In Progress"] };
    }
  }
  if (priority) filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;
  if (role === "Customer") {
    filter.customer = customerId;
  }
  if (status) {
  }

  const tickets = await Ticket.find(filter)
    .populate("customer", "name email")
    .populate("assignedTo", "name email");


  return tickets;
};
const getTicketById = async (id: string, customerId: string, role: string) => {
  const ticket = await Ticket.findById(id)
    .populate("customer", "name email")
    .populate("assignedTo", "name email");

  if (!ticket) {
    throw new AppError(404, "Ticket not found");
  }

  // only see can own ticket and all staff can see everyone ticket

  if (role === "Customer" && ticket.customer._id.toString() !== customerId) {
    throw new AppError(403, "Access denied to this ticket");
  }

  return ticket;
};

const updateTicket = async (id: string, payload: any) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedTicket;
};
const deleteTicketFromDB = async (id: string) => {
  await Ticket.findByIdAndDelete(id);
  return null;
};
const assignTicketUpdate = async (staffId: string, ticket: any) => {
  ticket.assignedTo = staffId;
  ticket.status = "In Progress";
  const result = await ticket.save();
  return result;
};
//comments
const createCommentIntoDb = async (
  ticketId: string,
  userId: string,
  userRole: string,
  payload: { content: string },
  ticket: any,
) => {
  const comment = await Comment.create({
    ticket: ticketId,
    user: userId,
    content: payload.content,
  });
  if (userRole === "Staff") {
    ticket.status = "In Progress";
    await ticket.save();
  }
  const populatedComment = await Comment.findById(comment._id).populate(
    "user",
    "name email role",
  );
  return populatedComment;
};

const getTicketCommentsFromDb = async (
  ticketId: string,
  userId: string,
  userRole: string,
) => {
  const comments = await Comment.find({ ticket: ticketId })
    .populate("user", "name email role")
    .sort({ createdAt: 1 });

  return comments;
};
const getAssignedTickets = async (staffId: string) => {
  const tickets = await Ticket.find({ assignedTo: staffId })
    .populate("customer", "name email")
    .populate("assignedTo", "name email");
  return tickets;
};

export const ticketService = {
  createdTicketDb,
  getAllTicket,
  getTicketById,
  updateTicket,
  assignTicketUpdate,
  deleteTicketFromDB,
  createCommentIntoDb,
  getTicketCommentsFromDb,
  getAssignedTickets,
};
