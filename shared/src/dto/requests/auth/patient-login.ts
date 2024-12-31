import { Patient } from "../..";

export type PatientLoginRequestDto = {
  email: string;
  password: string;
};

export type PatientLoginResponseDto =
  | {
      ok: true;
      patient: Patient;
    }
  | { ok: false; error: string };
