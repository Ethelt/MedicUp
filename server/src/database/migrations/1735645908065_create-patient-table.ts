import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("patient")
    .addColumn("id", "integer", (col) =>
      col.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn("firstName", "varchar", (col) => col.notNull())
    .addColumn("lastName", "varchar", (col) => col.notNull())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("phone", "varchar", (col) => col.notNull().unique())
    .addColumn("password", "varchar", (col) => col.notNull())
    .addColumn("passportNumber", "varchar")
    .addColumn("pesel", "varchar")
    .addColumn("createdAt", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .addColumn("deactivatedAt", "timestamp")
    .addCheckConstraint(
      "passport_or_pesel",
      sql`("passportNumber" IS NOT NULL AND "pesel" IS NULL) OR ("passportNumber" IS NULL AND "pesel" IS NOT NULL)`
    )
    .execute();
}
