import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { authService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = await req.body;
  const { email } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exits with this mail");
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
  console.log(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login successfully",
    data: null,
  });
});
export const authController = {
  registerUser,
  loginUser,
};
