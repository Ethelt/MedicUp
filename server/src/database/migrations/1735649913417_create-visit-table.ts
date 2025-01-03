import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("visit")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("patientId", "integer", (col) =>
      col.notNull().references("patient.id")
    )
    .addColumn("doctorId", "integer", (col) =>
      col.notNull().references("doctor.id")
    )
    .addColumn("startAt", "timestamptz", (col) => col.notNull())
    .addColumn("endAt", "timestamptz", (col) => col.notNull())
    .addColumn("cancelledAt", "timestamptz")
    .addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo("now()").notNull()
    )
    .execute();
}