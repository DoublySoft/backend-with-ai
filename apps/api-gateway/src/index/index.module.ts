import { Module } from "@nestjs/common";
import { IndexService } from "./application/services/index.service";
import { IndexController } from "./infrastructure/controllers/index.controller";

@Module({
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService],
})
export class IndexModule {}
