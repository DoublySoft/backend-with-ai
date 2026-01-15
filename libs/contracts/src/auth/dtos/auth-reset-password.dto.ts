import { IsString, MinLength, IsNotEmpty } from "class-validator";

export class AuthResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
