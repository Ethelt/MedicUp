import { Visit } from "../../entities";

export type MoveVisitRequestDto = {
  visitId: number;
  startAt: Date;
  endAt: Date;
};

export type MoveVisitResponseDto = {
  visit: Visit;
};
