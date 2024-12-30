import { Pool } from "pg";

export class Database {
  private static instance: Pool;

  static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || "5432"),
      });
    }

    return Database.instance;
  }
}
