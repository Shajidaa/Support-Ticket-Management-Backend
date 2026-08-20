import express, { Application, Request, Response } from "express";
import cors from "cors";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

//  Route
app.use("/api/v1/auth", AuthRoutes);

app.use(notFound);
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "HelpDesk API with TypeScript is running successfully!",
  });
});

export default app;
