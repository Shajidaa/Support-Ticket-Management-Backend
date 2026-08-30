import { Router } from "express";

import { auth } from "../../middleware/auth";
import { ticketController } from "./ticket.controller";

const router = Router();

router.post("/", auth("Customer"), ticketController.createTicket);
router.get("/", auth("Customer", "Staff"), ticketController.getAllTickets);
router.get("/assign-tickets", auth("Staff"), ticketController.getMyAssignedTickets);
router.get("/:id", auth("Customer", "Staff"), ticketController.getTicketById);

// update ticket
router.patch("/:id", auth("Customer"), ticketController.updateTicket);
// delete ticket
router.delete("/:id", auth("Customer"), ticketController.deleteTicket);
// only for Staff
router.patch("/:id/assign", auth("Staff"), ticketController.assignTicket);

//comments

router.post(
  "/:id/comments",
  auth("Customer", "Staff"),
  ticketController.addCommentToTicket,
);
router.get(
  "/:id/comments",
  auth("Customer", "Staff"),
  ticketController.getTicketComments,
);

export const TicketRoutes = router;
