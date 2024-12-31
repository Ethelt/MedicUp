import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DatabaseSchema } from "./db-schema";

export class Database {
  private static instance: Kysely<DatabaseSchema>;

  static getInstance(): Kysely<DatabaseSchema> {
    if (!Database.instance) {
      const dialect = new PostgresDialect({
        pool: new Pool({
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: parseInt(process.env.DB_PORT || "5432"),
        }),
      });

      Database.instance = new Kysely<DatabaseSchema>({
        dialect,
      });
    }

    return Database.instance;
  }
}
