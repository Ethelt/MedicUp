import type { Kysely } from "kysely";
import { DatabaseSchema } from "../db-schema";

export async function up(db: Kysely<DatabaseSchema>): Promise<void> {
  await db
    .insertInto("doctor")
    .values([
      {
        firstName: "Jan",
        lastName: "Kowalski",
        login: "jan.kowalski",
        password: "$2b$10$pwrEHGkBnnTL3.OMqJrDSeYUQqlXGky7mZRxGHs4fGNgVpRDZDbau",
      },
      {
        firstName: "Mariusz",
        lastName: "Nowak",
        login: "mariusz.nowak",
        password: "$2b$10$kQ6aU1bnJgVOMAL2KItiiunGRnaYaP0i0oWVXkOkQ9sD2Msizs1fm",
      },
			{
        firstName: "Anna",
        lastName: "Nowacka",
        login: "anna.nowacka", 
        password: "$2b$10$JsDZFZxl2F.89J8G2VXaXeyjKH2308rTwWrOOeM2ZaIo6xTO9oHZm"
			}
    ])
    .execute();

  await db
    .insertInto("registrar")
    .values({
      login: "adam.wilk",
      password: "$2b$10$kSNigmI1a5vyAJQnrkV3guoNWpiU8xGi6Q1SGF5dj1EzaCOoYT3qq",
    })
    .execute();
}
