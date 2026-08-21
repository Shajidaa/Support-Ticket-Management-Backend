import type { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (err instanceof SyntaxError && "body" in err) {
    statusCode = 400;
    message = "Invalid JSON payload passed in the request body.";
  }
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,

    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
