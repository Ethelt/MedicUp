import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("doctor")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("login", "varchar", (col) => col.notNull().unique())
    .addColumn("firstName", "varchar", (col) => col.notNull())
    .addColumn("lastName", "varchar", (col) => col.notNull())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addColumn("deactivatedAt", "timestamp")
    .execute();

}