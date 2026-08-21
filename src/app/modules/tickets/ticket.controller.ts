import { Request, Response } from "express";
import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ticketService } from "./ticket.service";
import { Ticket } from "./ticket.model";
import { AppError } from "../../errors/AppError";

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

  const result = await ticketService.getAllTicket(req.query, customerId!);
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
  const result = await ticketService.getTicketById(id as string, customerId!);
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
const assignTicket = catchAsync(async (req: Request, res: Response) => {});
export const ticketController = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  assignTicket,
};
