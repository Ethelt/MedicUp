import { Visit } from "../../entities";

export type GetVisitsForPatientRequestDto = {
  patientId: number;
};

export type GetVisitsForPatientResponseDto = {
  visits: Visit[];
};
