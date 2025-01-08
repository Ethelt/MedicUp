import { Visit } from "../../entities";

export type CancelVisitRequestDto = {
  visitId: number;
};

export type CancelVisitResponseDto = {
  visit: Visit;
};
