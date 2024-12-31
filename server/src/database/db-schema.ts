import { ColumnType } from "kysely";

import { GeneratedAlways } from "kysely";

export interface DatabaseSchema {
  patient: PatientTable;
}

export type PatientTable = {
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
};
