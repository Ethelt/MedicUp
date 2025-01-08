import {
  ApiRoutes,
  GetVisitsForPatientRequestDto,
  GetVisitsForPatientResponseDto,
} from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { VisitService } from "../visit/visit.service";
import { PatientService } from "./patient.service";

export class PatientController {
  static registerRoutes(app: Express) {
    app.get(ApiRoutes.patient.me, this.getMe);
    app.get(ApiRoutes.patient.visits, this.getVisitsForPatient);
  }

  private static async getMe(req: Request, res: Response) {
    const sessionData = getSessionData(req.session);

    const patient = await PatientService.getMe(sessionData);
    res.json(patient);
  }

  private static async getVisitsForPatient(
    req: Request<{}, {}, {}, GetVisitsForPatientRequestDto>,
    res: Response<GetVisitsForPatientResponseDto>
  ) {
    const sessionData = getSessionData(req.session);
    const requestedPatientId = parseInt(req.query.patientId.toString());

    const hasPermissions =
      sessionData.userId === requestedPatientId ||
      sessionData.userType === "registrar";

    if (!hasPermissions) {
      throw new Error("Unauthorized");
    }

    const visits = await VisitService.getVisitsForPatient(requestedPatientId);
    res.json({ visits });
  }
}
