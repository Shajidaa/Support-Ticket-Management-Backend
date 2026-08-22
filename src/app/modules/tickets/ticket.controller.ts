import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ticketService } from "./ticket.service";
import { Ticket } from "./ticket.model";
import { AppError } from "../../errors/AppError";
import { appendFileSync } from "node:fs";

// create ticket

const createTicket = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const customerId = req.user?.id;
  const result = await ticketService.createdTicketDb(
    payload,
    customerId as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ticket created successfully",
    data: result,
  });
});

const getAllTickets = catchAsync(async (req: Request, res: Response) => {
  const customerId = await req.user?.id;
  const role = await req.user?.role;
  const result = await ticketService.getAllTicket(
    req.query,
    customerId!,
    role as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get tickets successfully",
    data: result,
  });
});
const getTicketById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const customerId = await req.user?.id;
  const role = await req.user?.role;
  const result = await ticketService.getTicketById(
    id as string,
    customerId!,
    role as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get ticket successfully",
    data: result,
  });
});
const updateTicket = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new AppError(404, "Ticket not found");
  }
  const result = await ticketService.updateTicket(id as string, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Update the ticket successfully",
    data: result,
  });
});

const deleteTicket = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new AppError(httpStatus.NOT_FOUND, "Ticket not found");
  }

  const isClosed = ticket.status && ticket.status.toLowerCase() === "closed";
  if (!isClosed) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only tickets with a 'Closed' status can be deleted.",
    );
  }

  const result = await ticketService.deleteTicketFromDB(id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ticket deleted successfully",
    data: result,
  });
});

const assignTicket = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { staffId } = req.body;
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new AppError(404, "Ticket not found");
  }
  if (!staffId) {
    throw new AppError(404, "This staff is not found");
  }
  const result = await ticketService.assignTicketUpdate(staffId, ticket);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ticket assigned successfully",
    data: result,
  });
});

export const ticketController = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  assignTicket,
  deleteTicket,
};
