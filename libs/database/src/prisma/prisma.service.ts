import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
// Import from generated Prisma client (Prisma 7)
// Path: generated/prisma/client from project root
import { PrismaClient } from "../../../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaLogLevel } from "./prisma-log.enum";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // Create PostgreSQL connection pool for Prisma 7 adapter
    const connectionString = process.env.POSTGRES_URI;
    if (!connectionString) {
      throw new Error("POSTGRES_URI environment variable is not set");
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    // Initialize PrismaClient with adapter (Prisma 7 requirement)
    super({
      adapter,
      log: [
        { emit: "event", level: PrismaLogLevel.QUERY },
        { emit: "stdout", level: PrismaLogLevel.INFO },
        { emit: "stdout", level: PrismaLogLevel.WARN },
        { emit: "stdout", level: PrismaLogLevel.ERROR },
      ],
      errorFormat: "pretty",
    });

    // Log query events in development
    // Note: Prisma 7 may have different event handling - query logging is handled via log config
    if (process.env.NODE_ENV === "development") {
      // Query logging is configured via the log option above
      // If custom event handling is needed, it should be done via Prisma extensions
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Prisma connected to database");
    } catch (error) {
      this.logger.error("Failed to connect to database", error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log("Prisma disconnected from database");
  }

  // Note: $transaction is inherited from PrismaClient
  // Prisma 7 has its own transaction implementation
  // Use it directly: await this.$transaction(async (tx) => { ... })

  /**
   * Health check for database connection
   */
  async $healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error("Database health check failed", error);
      return false;
    }
  }
}
