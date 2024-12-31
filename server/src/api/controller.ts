import { ApiRoutes } from "@medicup/shared";
import { Express, NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors";
import { AuthController } from "./auth/auth.controller";

export class Controller {
  static registerRoutes(app: Express) {
    this.registerDefaultRoutes(app);
    AuthController.registerRoutes(app);
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
      if (err instanceof ApiError) {
        res.status(400).json(err.errorData);
      } else {
        res
          .status(err.status || 400)
          .json({ message: err.message ?? "Error occurred" });
      }
    });
  }
}
