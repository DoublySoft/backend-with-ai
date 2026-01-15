import { IsOptional, IsInt, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class FilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: "asc" | "desc";
}
