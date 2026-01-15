import { Module, Global } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { mongoDbProvider, MONGO_DB_PROVIDER } from "./mongo/mongo.provider";

@Global()
@Module({
  providers: [PrismaService, mongoDbProvider],
  exports: [PrismaService, MONGO_DB_PROVIDER],
})
export class DatabaseModule {}
