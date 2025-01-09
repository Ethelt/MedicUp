import { Visit } from "../../entities";

export type UpdateVisitRequestDto = {
  visitId: number;
  startAt?: Date;
  endAt?: Date;
  patientNote?: string;
  doctorPublicNote?: string;
  doctorPrivateNote?: string;
};

export type UpdateVisitResponseDto = {
  visit: Visit;
};
