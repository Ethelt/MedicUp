import { ApiRoutes } from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { DoctorService } from "./doctor.service";

export class DoctorController {
  static registerRoutes(app: Express) {
    app.get(ApiRoutes.doctors.me, this.getMe);
  }

  private static async getMe(req: Request, res: Response) {
    const sessionData = getSessionData(req.session);

    const doctor = await DoctorService.getMe(sessionData);
    res.json(doctor);
  }
}
