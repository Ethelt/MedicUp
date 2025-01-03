import { Visit } from "../../entities";

export type AddVisitRequestDto = {
  patientId: number;
  doctorId: number;
  startAt: Date;
  endAt: Date;
  patientNote: string | null;
};

export type AddVisitResponseDto = {
  visit: Visit;
};
