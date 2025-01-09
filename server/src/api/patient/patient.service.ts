import { Patient, UpdatePatientRequestDto } from "@medicup/shared";
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

  static async updatePatient(dto: UpdatePatientRequestDto): Promise<Patient> {
    const db = Database.getInstance();

    const patient = await db
      .updateTable("patient")
      .$if(!!dto.firstName, (qb) => qb.set({ firstName: dto.firstName }))
      .$if(!!dto.lastName, (qb) => qb.set({ lastName: dto.lastName }))
      .$if(!!dto.email, (qb) => qb.set({ email: dto.email }))
      .$if(!!dto.phone, (qb) => qb.set({ phone: dto.phone }))
      .$if(!!dto.pesel, (qb) => qb.set({ pesel: dto.pesel }))
      .$if(!!dto.passportNumber, (qb) =>
        qb.set({ passportNumber: dto.passportNumber })
      )
      .$if(!!dto.note, (qb) => qb.set({ note: dto.note }))
      .where("id", "=", dto.patientId)
      .where("deactivatedAt", "is", null)
      .returningAll()
      .executeTakeFirstOrThrow();

    return removePatientSensitiveData(patient);
  }
}
