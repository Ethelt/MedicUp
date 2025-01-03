import { Doctor } from "@medicup/shared";
import { SessionData } from "express-session";
import { sql } from "kysely";
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

  static async getAvailableInPeriod(start: Date, end: Date): Promise<Doctor[]> {
    const db = Database.getInstance();

    const doctors = await db
      .selectFrom("doctor")
      .leftJoin("visit", (qb) =>
        qb
          .onRef("doctor.id", "=", "visit.doctorId")
          .on((eb) =>
            eb.and([
              eb("visit.startAt", "<", end),
              eb("visit.endAt", ">", start),
            ])
          )
      )
      .selectAll("doctor")
      // we want the relation to not exists, but kysely typecheck doesn't allow this
      .where(sql<boolean>`visit.id is null`)
      .execute();

    return doctors.map(removeDoctorSensitiveData);
  }
}
