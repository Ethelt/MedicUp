import { ColumnType, Selectable } from "kysely";

import { GeneratedAlways } from "kysely";
import { Patient } from "@medicup/shared";
import { Satisfies } from "../utils/types";

export interface DatabaseSchema {
  patient: PatientTable;
  registrar: RegistrarTable;
  doctor: DoctorTable;
  visit: VisitTable;
}

type PatientTable = {
  id: GeneratedAlways<number>;
  pesel: string | null;
  passportNumber: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  note: string | null;
  createdAt: GeneratedAlways<Date>;
  deactivatedAt: ColumnType<Date | null, Date | null, never>;
};

type _PatientTypeCheck = Satisfies<Selectable<PatientTable>, Patient>;

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
  patientNote: string | null;
  doctorPublicNote: string | null;
  doctorPrivateNote: string | null;
  startAt: Date;
  endAt: Date;
  cancelledAt: ColumnType<Date | null, Date | null, never>;
  createdAt: GeneratedAlways<Date>;
}
