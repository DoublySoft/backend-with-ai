import { IsOptional, IsBoolean } from "class-validator";

export class StateArchiveDto {
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
