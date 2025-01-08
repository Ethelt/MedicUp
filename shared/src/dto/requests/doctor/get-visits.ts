import { Visit } from "../../entities";

export type GetVisitsForDoctorRequestDto = {
  doctorId: number;
};

export type GetVisitsForDoctorResponseDto = {
  visits: Visit[];
};
