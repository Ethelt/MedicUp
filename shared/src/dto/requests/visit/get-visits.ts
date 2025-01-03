import { Visit } from "../../entities";

export type GetVisitsRequestDto = {
  patientId: number;
};

export type GetVisitsResponseDto = {
  visits: Visit[];
};
