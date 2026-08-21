import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { authService } from "./auth.service";
import { AppError } from "../../errors/AppError";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = await req.body;
  const { email } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(404, "User already exits with this mail");
  }
  const result = await authService.register(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = await req.body;
  const { email } = payload;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError(404, "Account does not create with this email. ");
  }
  const result = await authService.login(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login successfully",
    data: result,
  });
});
export const authController = {
  registerUser,
  loginUser,
};
