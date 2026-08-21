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
export const ticketService = {
  createdTicketDb,
};
