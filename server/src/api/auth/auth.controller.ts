import { ApiRoutes } from "@medicup/shared";
import { Express, Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static registerRoutes(app: Express): void {
    app.post(ApiRoutes.auth.loginPatient, this.loginPatient);
    app.post(ApiRoutes.auth.loginDoctor, this.loginDoctor);
    app.post(ApiRoutes.auth.loginRegistrar, this.loginRegistrar);
    app.post(ApiRoutes.auth.registerPatient, this.registerPatient);
    app.post(ApiRoutes.auth.logout, this.logout);
  }

  private static async loginPatient(
    req: Request,
    res: Response
  ): Promise<void> {
    const result = await AuthService.loginPatient(req.body, req.session);
    res.json(result);
  }

  private static async loginDoctor(req: Request, res: Response): Promise<void> {
    const result = await AuthService.loginDoctor();
    res.json({ message: result });
  }

  private static async loginRegistrar(
    req: Request,
    res: Response
  ): Promise<void> {
    const result = await AuthService.loginRegistrar();
    res.json({ message: result });
  }

  private static async registerPatient(
    req: Request,
    res: Response
  ): Promise<void> {
    const result = await AuthService.registerPatient(req.body, req.session);
    res.json(result);
  }

  private static async logout(req: Request, res: Response): Promise<void> {
    const result = await AuthService.logout();
    res.json({ message: result });
  }
}
