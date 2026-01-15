import { IsString, IsNotEmpty } from "class-validator";

export class AuthVerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  code!: string;
}
