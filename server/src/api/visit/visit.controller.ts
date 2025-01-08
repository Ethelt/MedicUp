import {
  AddVisitRequestDto,
  AddVisitResponseDto,
  ApiRoutes,
  CancelVisitRequestDto,
  CancelVisitResponseDto,
} from "@medicup/shared";
import { Express, Request, Response } from "express";
import { getSessionData } from "../../utils/session-data";
import { VisitService } from "./visit.service";

export class VisitController {
  static registerRoutes(app: Express) {
    app.post(ApiRoutes.visit.root, this.addVisit);
    app.delete(ApiRoutes.visit.root, this.cancelVisit);
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

  private static async cancelVisit(
    req: Request<{}, {}, CancelVisitRequestDto>,
    res: Response<CancelVisitResponseDto>
  ) {
    const requestedVisitId = parseInt(req.body.visitId.toString());

    const visit = await VisitService.cancelVisit(requestedVisitId);
    res.json({ visit });
  }
}
