import {
  IsOptional,
  IsString,
  MinLength,
  IsEmail,
  IsArray,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { EUserRole } from "../enums/user-role.enum";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(EUserRole, { each: true })
  roles?: EUserRole[];

  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  isPhoneNumberVerified?: boolean;
}
