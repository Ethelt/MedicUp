import { Doctor, Patient, Registrar } from "@medicup/shared";
import { Selectable } from "kysely";
import { DatabaseSchema } from "../database/db-schema";

export function removePatientSensitiveData(
  patient: Selectable<DatabaseSchema["patient"]>
): Patient {
  const { password: _, ...patientWithoutPassword } = patient;
  return patientWithoutPassword;
}

export function removeDoctorSensitiveData(
  doctor: Selectable<DatabaseSchema["doctor"]>
): Doctor {
  const { password: _, ...doctorWithoutPassword } = doctor;
  return doctorWithoutPassword;
}

export function removeRegistrarSensitiveData(
  registrar: Selectable<DatabaseSchema["registrar"]>
): Registrar {
  const { password: _, ...registrarWithoutPassword } = registrar;
  return registrarWithoutPassword;
}
