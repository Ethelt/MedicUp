import { ColumnType } from "kysely";

import { GeneratedAlways } from "kysely";

export interface DatabaseSchema {
  patient: PatientTable;
  registrar: RegistrarTable;
  doctor: DoctorTable;
  visit: VisitTable;
}

interface PatientTable {
  id: GeneratedAlways<number>;
  pesel: string | null;
  passportNumber: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: GeneratedAlways<Date>;
  deactivatedAt: ColumnType<Date | null, Date | null, never>;
}

interface RegistrarTable {
  id: GeneratedAlways<number>;
  login: string;
  password: string;
  createdAt: GeneratedAlways<Date>;
  deactivatedAt: ColumnType<Date | null, Date | null, never>;
}

interface DoctorTable {
  id: GeneratedAlways<number>;
  login: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: GeneratedAlways<Date>;
  deactivatedAt: ColumnType<Date | null, Date | null, never>;
}

interface VisitTable {
  id: GeneratedAlways<number>;
  patientId: number;
  doctorId: number;
  startAt: Date;
  endAt: Date;
  cancelledAt: ColumnType<Date | null, Date | null, never>;
  createdAt: GeneratedAlways<Date>;
}
