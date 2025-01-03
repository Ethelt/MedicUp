import { Visit } from "@medicup/shared";
import { Database } from "../../database/database";

export class VisitService {
  static async getVisitsForPatient(patientId: number): Promise<Visit[]> {
    const db = Database.getInstance();
    const visitsWithData = await db
      .selectFrom("visit")
      .innerJoin("doctor", "doctor.id", "visit.doctorId")
      .innerJoin("patient", "patient.id", "visit.patientId")
      .selectAll("visit")
      .select([
        "doctor.firstName as doctorFirstName",
        "doctor.lastName as doctorLastName",
      ])
      .select([
        "patient.firstName as patientFirstName",
        "patient.lastName as patientLastName",
      ])
      .where("patientId", "=", patientId)
      .execute();

    const visits = visitsWithData.map((visit) => {
      return {
        ...visit,
        doctor: {
          id: visit.doctorId,
          firstName: visit.doctorFirstName,
          lastName: visit.doctorLastName,
        },
        patient: {
          id: visit.patientId,
          firstName: visit.patientFirstName,
          lastName: visit.patientLastName,
        },
      };
    });

    return visits;
  }
}
