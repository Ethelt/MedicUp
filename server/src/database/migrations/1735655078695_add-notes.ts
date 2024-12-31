import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("patient")
    .addColumn("note", "varchar")
    .execute();

  await db.schema
    .alterTable("visit")
    .addColumn("patientNote", "varchar")
    .addColumn("doctorPublicNote", "varchar")
    .addColumn("doctorPrivateNote", "varchar")
    .execute();

}