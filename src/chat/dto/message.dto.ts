import { IsNotEmpty, IsString } from "class-validator";

export class MessageDto {
    id: number;
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
