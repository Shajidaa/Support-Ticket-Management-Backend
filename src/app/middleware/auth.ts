import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import config from "../config";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: "Customer" | "Staff";
      };
    }
  }
}

export const auth = (...requiredRoles: ("Customer" | "Staff")[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      res.status(401).json({
        success: false,
        message:
          "You are not logged in. Please log in to access this resource.",
      });
      return;
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const { id, role } = verifiedToken.data as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      res.status(403).json({
        success: false,
        message:
          "Forbidden. You don't have permission to access this resource.",
      });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
      return;
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  });
};
