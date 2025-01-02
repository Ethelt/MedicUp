import { Registrar } from "../..";

export type RegistrarLoginRequestDto = {
  login: string;
  password: string;
};

export type RegistrarLoginResponseDto = { registrar: Registrar };
