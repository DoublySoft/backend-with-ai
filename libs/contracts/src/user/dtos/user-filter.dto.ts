import {
  IsOptional,
  IsString,
  IsEmail,
  IsArray,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { FilterDto } from "@libs/common";
import { EUserRole } from "../enums/user-role.enum";

export class UserFilterDto extends FilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(EUserRole, { each: true })
  roles?: EUserRole[];

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneNumberVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
