import { Doctor, Patient } from "@medicup/shared";
import { SessionData } from "express-session";
import { Database } from "../../database/database";
import { removeDoctorSensitiveData } from "../../utils/sensitive-data";

export class DoctorService {
  static async getMe(session: SessionData): Promise<Doctor> {
    const db = Database.getInstance();
    const doctor = await db
      .selectFrom("doctor")
      .selectAll()
      .where("id", "=", session.userId)
      .where("deactivatedAt", "is", null)
      .executeTakeFirstOrThrow();

    return removeDoctorSensitiveData(doctor);
  }
}
