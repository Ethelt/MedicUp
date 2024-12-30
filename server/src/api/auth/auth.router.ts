import { Express, Request, Response } from "express";

export class AuthRouter {
  static registerRoutes(app: Express): void {
    app.post("/auth/login", this.login);
  }

  private static login(req: Request, res: Response): void {
    res.json({ message: "Login successful" });
  }
}
