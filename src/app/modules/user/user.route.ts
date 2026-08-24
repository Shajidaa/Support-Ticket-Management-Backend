import { Router } from "express";

import { auth } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/", auth("Staff"), userController.getAllTickets);

export const UserRoute = router;
