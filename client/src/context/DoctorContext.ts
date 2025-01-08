import { Doctor } from "@medicup/shared";
import { createContext } from "react";

export const DoctorContext = createContext<{ doctor: Doctor | null }>({
  doctor: null,
});
