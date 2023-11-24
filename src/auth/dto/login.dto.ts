import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  email: string;
  bday: Date;
  isAdmin: Boolean;
}
