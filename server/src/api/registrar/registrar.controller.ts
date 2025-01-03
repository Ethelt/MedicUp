import { ApiRoutes } from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { RegistrarService } from "./registrar.service";

export class RegistrarController {
  static registerRoutes(app: Express) {
    app.get(ApiRoutes.registrar.me, this.getMe);
  }

  private static async getMe(req: Request, res: Response) {
    const sessionData = getSessionData(req.session);

    const registrar = await RegistrarService.getMe(sessionData);
    res.json(registrar);
  }
}
