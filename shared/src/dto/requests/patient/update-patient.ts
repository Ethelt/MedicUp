import { Patient } from "../../entities";

export type UpdatePatientRequestDto = {
  patientId: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  pesel?: string;
  passportNumber?: string;
  note?: string;
};

export type UpdatePatientResponseDto = {
  patient: Patient;
};
