import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  bday: Date;
}
