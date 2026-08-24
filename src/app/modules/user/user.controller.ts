import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../errors/AppError";

const getAllTickets = catchAsync(async (req: Request, res: Response) => {
  const role = await req.user?.role;
  if (role !== "Staff") {
    throw new AppError(403, "You can see the all staff");
  }
  const result = await userService.getAllStaff(role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Get all staff successfully",
    data: result,
  });
});
export const userController = {
  getAllTickets,
};
