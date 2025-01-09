import { Patient } from "../../entities";

export type GetPatientRequestDto = {
  patientId: number;
};

export type GetPatientResponseDto = {
  patient: Patient;
};
