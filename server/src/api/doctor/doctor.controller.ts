import {
  ApiRoutes,
  GetAvailableDoctorsRequestDto,
  GetAvailableDoctorsResponseDto,
  GetVisitsForDoctorRequestDto,
  GetVisitsForDoctorResponseDto,
} from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { VisitService } from "../visit/visit.service";
import { DoctorService } from "./doctor.service";

export class DoctorController {
  static registerRoutes(app: Express) {
    app.get(ApiRoutes.doctor.me, this.getMe);
    app.get(ApiRoutes.doctor.available, this.getAvailbleDoctorsInPeriod);
    app.get(ApiRoutes.doctor.visits, this.getVisitsForDoctor);
    app.get(ApiRoutes.doctor.root, this.getAll);
  }

  private static async getAll(req: Request, res: Response) {
    const doctors = await DoctorService.getAll();
    res.json({ doctors });
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

  private static async getVisitsForDoctor(
    req: Request<{}, {}, {}, GetVisitsForDoctorRequestDto>,
    res: Response<GetVisitsForDoctorResponseDto>
  ) {
    const requestedDoctorId = parseInt(req.query.doctorId.toString());

    const visits = await VisitService.getVisitsForDoctor(requestedDoctorId);
    res.json({ visits });
  }
}
