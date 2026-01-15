import { IsOptional, IsBoolean } from "class-validator";

export class StateDeleteDto {
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
