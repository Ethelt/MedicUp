import {
  ApiRoutes,
  GetPatientRequestDto,
  GetPatientResponseDto,
  GetVisitsForPatientRequestDto,
  GetVisitsForPatientResponseDto,
} from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { VisitService } from "../visit/visit.service";
import { PatientService } from "./patient.service";

export class PatientController {
  static registerRoutes(app: Express) {
    app.get(ApiRoutes.patient.root, this.getPatient);
    app.get(ApiRoutes.patient.me, this.getMe);
    app.get(ApiRoutes.patient.visits, this.getVisitsForPatient);
  }

  private static async getMe(req: Request, res: Response) {
    const sessionData = getSessionData(req.session);

    const patient = await PatientService.getPatient(sessionData.userId);
    res.json(patient);
  }

  private static async getPatient(
    req: Request<{}, {}, {}, GetPatientRequestDto>,
    res: Response<GetPatientResponseDto>
  ) {
    const patient = await PatientService.getPatient(req.query.patientId);
    res.json({ patient });
  }

  private static async getVisitsForPatient(
    req: Request<{}, {}, {}, GetVisitsForPatientRequestDto>,
    res: Response<GetVisitsForPatientResponseDto>
  ) {
    const requestedPatientId = parseInt(req.query.patientId.toString());
    const visits = await VisitService.getVisitsForPatient(requestedPatientId);
    res.json({ visits });
  }
}
