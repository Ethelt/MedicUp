import { Express, Request, Response, NextFunction } from "express";
import { Database } from "../database/database";
import { AuthRouter } from "./auth/auth.router";
import { ApiRoutes } from "@medicup/shared";

export class Router {
  static registerRoutes(app: Express) {
    this.registerDefaultRoutes(app);
    AuthRouter.registerRoutes(app);
    this.registerErrorHandlers(app);
  }

  private static registerDefaultRoutes(app: Express) {
    const pool = Database.getInstance();

    app.get(ApiRoutes.health, async (req: Request, res: Response) => {
      const result = await pool.query("SELECT NOW()");
      res.json({
        message: "Server is running",
        dbTime: result.rows[0].now,
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
        .status(err.status || 500)
        .json({ message: err.message ?? "Error occurred" });
    });
  }
}
