import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { authService } from "./auth.service";
import { AppError } from "../../errors/AppError";
import setCookie from "../../utils/cookies";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = await req.body;
  const { email } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(404, "User already exits with this mail");
  }
  const { accessToken, refreshToken } = await authService.register(payload);
  setCookie(
    res,
    "accessToken",
    accessToken,
    Number(process.env.COOKIE_ACCESS_TOKEN_MAX_AGE),
  );

  setCookie(
    res,
    "refreshToken",
    refreshToken,
    Number(process.env.COOKIE_REFRESH_MAX_AGE),
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: { accessToken, refreshToken },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = await req.body;
  const { email } = payload;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError(404, "Account does not create with this email. ");
  }
  const { accessToken, refreshToken } = await authService.login(payload);
  setCookie(
    res,
    "accessToken",
    accessToken,
    Number(process.env.COOKIE_ACCESS_TOKEN_MAX_AGE),
  );

  setCookie(
    res,
    "refreshToken",
    refreshToken,
    Number(process.env.COOKIE_REFRESH_MAX_AGE),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login successfully",
    data: { accessToken, refreshToken },
  });
});
const refreshTokenUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refreshToken;

    const accessToken = await authService.refreshToken(refreshToken);
    setCookie(
      res,
      "accessToken",
      accessToken,
      Number(process.env.COOKIE_ACCESS_TOKEN_MAX_AGE!),
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Access Token get successfully",
      data: { accessToken },
    });
  },
);
export const authController = {
  registerUser,
  loginUser,
  refreshTokenUser,
};
