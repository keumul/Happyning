import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class MessageDto {
    @IsNotEmpty()
    chat: number;

    @IsNotEmpty()
    user: {
        id: number;
        username: string;
    };

    @IsNotEmpty()
    @IsString()
    message: string;

    latency: number;
}
