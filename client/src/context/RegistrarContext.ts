import { Registrar } from "@medicup/shared";
import { createContext } from "react";

export const RegistrarContext = createContext<Registrar | null>(null);
