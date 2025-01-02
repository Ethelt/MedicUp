import { Patient } from "@medicup/shared";
import { createContext } from "react";

export const PatientContext = createContext<Patient | null>(null);
