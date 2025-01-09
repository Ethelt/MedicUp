import { Patient } from "@medicup/shared";
import { Database } from "../../database/database";
import { removePatientSensitiveData } from "../../utils/sensitive-data";

export class PatientService {
  static async getPatient(patientId: number): Promise<Patient> {
    const db = Database.getInstance();
    const patient = await db
      .selectFrom("patient")
      .selectAll()
      .where("id", "=", patientId)
      .where("deactivatedAt", "is", null)
      .executeTakeFirstOrThrow();

    return removePatientSensitiveData(patient);
  }
}
