import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@libs/database";
import { Inject } from "@nestjs/common";
import { MONGO_DB_PROVIDER } from "@libs/database";
import { Db } from "mongodb";

export interface HealthStatus {
  status: "ok" | "error";
  timestamp: string;
  uptime: number;
}

export interface DetailedHealthStatus extends HealthStatus {
  services: {
    postgresql: {
      status: "ok" | "error";
      message?: string;
    };
    mongodb: {
      status: "ok" | "error";
      message?: string;
    };
  };
}

@Injectable()
export class IndexService {
  private readonly logger = new Logger(IndexService.name);
  private readonly startTime = Date.now();

  constructor(
    private readonly prisma: PrismaService,
    @Inject(MONGO_DB_PROVIDER)
    private readonly mongoDb: Db,
  ) {}

  /**
   * Get basic health status
   */
  async getHealth(): Promise<HealthStatus> {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
    };
  }

  /**
   * Get detailed health status including database connections
   */
  async getDetailedHealth(): Promise<DetailedHealthStatus> {
    const baseHealth = await this.getHealth();
    const services = {
      postgresql: await this.checkPostgreSQL(),
      mongodb: await this.checkMongoDB(),
    };

    const allServicesOk =
      services.postgresql.status === "ok" && services.mongodb.status === "ok";

    return {
      ...baseHealth,
      status: allServicesOk ? "ok" : "error",
      services,
    };
  }

  /**
   * Check PostgreSQL connection
   */
  private async checkPostgreSQL(): Promise<{
    status: "ok" | "error";
    message?: string;
  }> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: "ok" };
    } catch (error) {
      this.logger.error("PostgreSQL health check failed", error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Connection failed",
      };
    }
  }

  /**
   * Check MongoDB connection
   */
  private async checkMongoDB(): Promise<{
    status: "ok" | "error";
    message?: string;
  }> {
    try {
      await this.mongoDb.admin().ping();
      return { status: "ok" };
    } catch (error) {
      this.logger.error("MongoDB health check failed", error);
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Connection failed",
      };
    }
  }
}
