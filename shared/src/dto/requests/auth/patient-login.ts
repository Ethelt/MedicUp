import { Patient } from "../..";

export type PatientLoginRequestDto = {
  email: string;
  password: string;
};

export type PatientLoginResponseDto = { patient: Patient };
