import { Registrar } from "@medicup/shared";
import { SessionData } from "express-session";
import { Database } from "../../database/database";
import { removeRegistrarSensitiveData } from "../../utils/sensitive-data";

export class RegistrarService {
  static async getMe(session: SessionData): Promise<Registrar> {
    const db = Database.getInstance();
    const registrar = await db
      .selectFrom("registrar")
      .selectAll()
      .where("id", "=", session.userId)
      .where("deactivatedAt", "is", null)
      .executeTakeFirstOrThrow();

    return removeRegistrarSensitiveData(registrar);
  }
}
