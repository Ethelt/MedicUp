import { Patient } from "@medicup/shared";
import { createContext } from "react";

export const PatientContext = createContext<{ patient: Patient | null }>({
  patient: null,
});
