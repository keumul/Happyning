import { IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    @IsString()
    username: string;
    
    @IsString()
    email: string;

    @IsString() 
    password: string;
    bday: Date;
    role: string;
    isConfirmed: boolean;
    activationCode: string;
}
