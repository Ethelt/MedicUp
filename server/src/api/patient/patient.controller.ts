import { ApiRoutes } from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { PatientService } from "./patient.service";

export class PatientController {
  static registerRoutes(app: Express) {
    app.get(ApiRoutes.patient.me, this.getMe);
  }

  private static async getMe(req: Request, res: Response) {
    const sessionData = getSessionData(req.session);

    const patient = await PatientService.getMe(sessionData);
    res.json(patient);
  }
}
