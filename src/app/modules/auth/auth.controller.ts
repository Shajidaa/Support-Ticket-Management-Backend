import { Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = await req.body;
  console.log(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: null,
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
