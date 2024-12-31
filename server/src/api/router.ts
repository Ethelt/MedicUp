import { ApiRoutes } from "@medicup/shared";
import { Express, NextFunction, Request, Response } from "express";
import { AuthRouter } from "./auth/auth.router";

export class Router {
  static registerRoutes(app: Express) {
    this.registerDefaultRoutes(app);
    AuthRouter.registerRoutes(app);
    this.registerErrorHandlers(app);
  }

  private static registerDefaultRoutes(app: Express) {
    app.get(ApiRoutes.health, async (req: Request, res: Response) => {
      res.json({
        message: "OK",
      });
    });
  }

  private static registerErrorHandlers(app: Express) {
    // not found handler
    app.use((_: Request, res: Response, __: NextFunction) => {
      res.status(404).json({ message: "Not found" });
    });

    // default error handler
    app.use((err: any, _: Request, res: Response, __: NextFunction) => {
      res
        .status(err.status || 400)
        .json({ message: err.message ?? "Error occurred" });
    });
  }
}
