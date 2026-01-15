import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from "class-validator";

export class AuthSignUpDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: "phoneNumber must be a valid phone number",
  })
  phoneNumber!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  locale?: string;
}
