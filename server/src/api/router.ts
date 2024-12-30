import { Express, Request, Response } from "express";
import { Database } from "../database/database";
import { AuthRouter } from "./auth/auth.router";

export class Router {
  static registerRoutes(app: Express) {
    this.registerDefaultRoutes(app);
    AuthRouter.registerRoutes(app);
  }

  private static registerDefaultRoutes(app: Express) {
    const pool = Database.getInstance();

    app.get("/health", async (req: Request, res: Response) => {
      try {
        const result = await pool.query("SELECT NOW()");
        res.json({
          message: "Server is running",
          dbTime: result.rows[0].now,
        });
      } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
      }
    });
  }
}
