import { ColumnType } from "kysely";

import { GeneratedAlways } from "kysely";

export interface DatabaseSchema {
  patient: PatientTable;
  registrar: RegistrarTable;
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
