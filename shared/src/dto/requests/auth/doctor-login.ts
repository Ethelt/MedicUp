import { Doctor, Patient } from "../..";

export type DoctorLoginRequestDto = {
  login: string;
  password: string;
};

export type DoctorLoginResponseDto = { doctor: Doctor };
