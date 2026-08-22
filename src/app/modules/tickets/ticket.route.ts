import { Router } from "express";

import { auth } from "../../middleware/auth";
import { ticketController } from "./ticket.controller";

const router = Router();

router.post("/", auth("Customer"), ticketController.createTicket);
router.get("/", auth("Customer", "Staff"), ticketController.getAllTickets);
router.get("/:id", auth("Customer", "Staff"), ticketController.getTicketById);

// update ticket
router.patch("/:id", auth("Customer"), ticketController.updateTicket);
// delete ticket
router.delete("/:id", auth("Customer"), ticketController.deleteTicket);
// only for Staff
router.patch("/:id/assign", auth("Staff"), ticketController.assignTicket);

export const TicketRoutes = router;
