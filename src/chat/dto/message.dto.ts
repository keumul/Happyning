import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    chat: number;

    @IsNotEmpty()
    user: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(1, {
        message: 'Message must be at least 1 characters long'
    })
    content: string;
}
