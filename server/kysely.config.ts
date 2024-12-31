import { defineConfig } from "kysely-ctl";
import { Database } from "./src/database/database";

export default defineConfig({
  kysely: Database.getInstance(),
  migrations: {
    migrationFolder: "src/database/migrations",
    getMigrationPrefix: () => `${Date.now()}_`,
  },
});
