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

export type PatientRegisterResponseDto = { patient: Patient };

export type PatientRegisterErrorDto =
  | {
      email: string;
    }
  | {
      phoneNumber: string;
    }
  | {
      passportNumber: string;
    }
  | {
      pesel: string;
    };
