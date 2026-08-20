import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

//  Route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "HelpDesk API with TypeScript is running successfully!",
  });
});

export default app;
