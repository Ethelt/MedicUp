import { ApiRoutes } from "@medicup/shared";
import { Express, Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthRouter {
  static registerRoutes(app: Express): void {
    app.post(ApiRoutes.auth.login, this.login);
  }

  // @TODO: add actual login logic
  private static async login(req: Request, res: Response): Promise<void> {
    const result = await AuthService.login();
    res.json({ message: result });
  }
}
