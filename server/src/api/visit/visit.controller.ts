import {
  AddVisitRequestDto,
  AddVisitResponseDto,
  ApiRoutes,
} from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { VisitService } from "./visit.service";

export class VisitController {
  static registerRoutes(app: Express) {
    app.post(ApiRoutes.visit.root, this.addVisit);
  }

  private static async addVisit(
    req: Request<{}, {}, AddVisitRequestDto>,
    res: Response<AddVisitResponseDto>
  ) {
    const sessionData = getSessionData(req.session);
    const requestedPatientId = parseInt(req.body.patientId.toString());

    const hasPermissions =
      sessionData.userId === requestedPatientId ||
      sessionData.userType === "registrar";

    if (!hasPermissions) {
      throw new Error("Unauthorized");
    }

    const visit = await VisitService.addVisit(req.body);
    res.json({ visit });
  }
}
