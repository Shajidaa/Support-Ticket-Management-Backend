import { ITicket } from "./ticket.interface";
import { Ticket } from "./ticket.model";

const createdTicketDb = async (payload: ITicket, customerId: string) => {
  const { title, description, priority, status } = payload;

  const ticket = await Ticket.create({
    title,
    description,
    status,
    priority,
    customer: customerId,
  });
  return ticket;
};
const getAllTicket = async (query: any, customerId: string) => {
  const { status, priority, assignedTo } = query;
  const customer = customerId;
  const filter: any = { customer };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignedTo) filter.assignedTo = assignedTo;

  const tickets = await Ticket.find(filter);
  return tickets;
};
export const ticketService = {
  createdTicketDb,
  getAllTicket,
};
