import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsArray,
  IsEnum,
} from "class-validator";
import { EUserRole } from "../enums/user-role.enum";

export class UserCreateDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phoneNumber!: string;

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
}
