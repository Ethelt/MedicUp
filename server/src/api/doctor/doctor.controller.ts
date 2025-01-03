import {
  ApiRoutes,
  GetAvailableDoctorsRequestDto,
  GetAvailableDoctorsResponseDto,
} from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { DoctorService } from "./doctor.service";

export class DoctorController {
  static registerRoutes(app: Express) {
    app.get(ApiRoutes.doctor.me, this.getMe);
    app.get(ApiRoutes.doctor.available, this.getAvailbleDoctorsInPeriod);
  }

  private static async getMe(req: Request, res: Response) {
    const sessionData = getSessionData(req.session);

    const doctor = await DoctorService.getMe(sessionData);
    res.json(doctor);
  }

  private static async getAvailbleDoctorsInPeriod(
    req: Request<{}, {}, {}, GetAvailableDoctorsRequestDto>,
    res: Response<GetAvailableDoctorsResponseDto>
  ) {
    const doctors = await DoctorService.getAvailableInPeriod(
      new Date(req.query.start),
      new Date(req.query.end)
    );
    res.json({ doctors: doctors });
  }
}
