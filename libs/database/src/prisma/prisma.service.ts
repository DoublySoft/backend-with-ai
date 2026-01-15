import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaLogLevel } from "./prisma-log.enum";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: "event", level: PrismaLogLevel.QUERY },
        { emit: "stdout", level: PrismaLogLevel.INFO },
        { emit: "stdout", level: PrismaLogLevel.WARN },
        { emit: "stdout", level: PrismaLogLevel.ERROR },
      ],
      errorFormat: "pretty",
    });

    // Log query events in development
    if (process.env.NODE_ENV === "development") {
      this.$on(
        PrismaLogLevel.QUERY,
        (e: { query: string; params: string; duration: number }) => {
          this.logger.debug(`Query: ${e.query}`);
          this.logger.debug(`Params: ${e.params}`);
          this.logger.debug(`Duration: ${e.duration}ms`);
        },
      );
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

  /**
   * Execute a transaction with automatic rollback on error
   */
  async $transaction<T>(
    callback: (tx: PrismaClient) => Promise<T>,
    options?: { maxWait?: number; timeout?: number },
  ): Promise<T> {
    return super.$transaction(callback, options);
  }

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
