import { defineConfig } from "prisma/config";

// For Prisma 7, we need the database URL for config loading
// Use a default value during generation if POSTGRES_URI is not set
const databaseUrl =
  process.env.POSTGRES_URI ||
  "postgresql://postgres:postgres@localhost:5432/backend_db?schema=public";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
