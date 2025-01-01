import { Patient } from "@medicup/shared";
import { Selectable } from "kysely";
import { DatabaseSchema } from "../database/db-schema";

export const removePatientSensitiveData = (
  patient: Selectable<DatabaseSchema["patient"]>
): Patient => {
  const { password: _, ...patientWithoutPassword } = patient;
  return patientWithoutPassword;
};
