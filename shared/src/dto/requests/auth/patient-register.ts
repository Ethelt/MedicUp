import { Patient } from "../../entities";

export type PatientRegisterRequestDto = {
  email: string;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
} & (
  | {
      pesel: string;
    }
  | {
      passportNumber: string;
    }
);

export type PatientRegisterResponseDto =
  | {
      ok: true;
      patient: Patient;
    }
  | { ok: false; error: string };
