import { Module, Global } from "@nestjs/common";
import { CodeService } from "./services/code.service";
import { HashService } from "./services/hash.service";
import { TimeService } from "./services/time.service";

@Global()
@Module({
  providers: [CodeService, HashService, TimeService],
  exports: [CodeService, HashService, TimeService],
})
export class CommonModule {}
