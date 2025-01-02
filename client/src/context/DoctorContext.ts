import { Doctor } from "@medicup/shared";
import { createContext } from "react";

export const DoctorContext = createContext<Doctor | null>(null);
