import { Patient } from "@medicup/shared";
import { SessionData } from "express-session";
import { Database } from "../../database/database";
import { removePatientSensitiveData } from "../../utils/sensitive-data";

export class PatientService {
  static async getMe(session: SessionData): Promise<Patient> {
    const db = Database.getInstance();
    const patient = await db
      .selectFrom("patient")
      .selectAll()
      .where("id", "=", session.userId)
      .where("deactivatedAt", "is", null)
      .executeTakeFirstOrThrow();

    return removePatientSensitiveData(patient);
  }
}
