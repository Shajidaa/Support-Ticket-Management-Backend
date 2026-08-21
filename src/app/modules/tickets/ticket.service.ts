import { ITicket } from "./ticket.interface";

const createdTicketDb = async (payload: ITicket, id: string) => {
  console.log({ payload, id });
};
export const ticketService = {
  createdTicketDb,
};
