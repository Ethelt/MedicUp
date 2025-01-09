import { Patient } from "../../entities";

export type GetAllPatientsRequestDto = {};

export type GetAllPatientsResponseDto = {
  patients: Patient[];
};
