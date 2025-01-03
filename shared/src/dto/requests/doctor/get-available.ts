import { Doctor } from "../../entities";

export type GetAvailableDoctorsRequestDto = {
  start: string; // Date
  end: string; // Date
};

export type GetAvailableDoctorsResponseDto = {
  doctors: Doctor[];
};
