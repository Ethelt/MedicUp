import {
  AddVisitRequestDto,
  AddVisitResponseDto,
  ApiRoutes,
  CancelVisitRequestDto,
  CancelVisitResponseDto,
  UpdateVisitRequestDto,
  UpdateVisitResponseDto,
} from "@medicup/shared";
import { Express, Request, Response } from "express";
import { VisitService } from "./visit.service";

export class VisitController {
  static registerRoutes(app: Express) {
    app.post(ApiRoutes.visit.root, this.addVisit);
    app.delete(ApiRoutes.visit.root, this.cancelVisit);
    app.patch(ApiRoutes.visit.root, this.updateVisit);
  }

  private static async addVisit(
    req: Request<{}, {}, AddVisitRequestDto>,
    res: Response<AddVisitResponseDto>
  ) {
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

  private static async updateVisit(
    req: Request<{}, {}, UpdateVisitRequestDto>,
    res: Response<UpdateVisitResponseDto>
  ) {
    const visit = await VisitService.updateVisit(req.body);
    res.json({ visit });
  }
}
