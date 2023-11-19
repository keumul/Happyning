import { IsNotEmpty, IsString } from "class-validator";

export class EventDto {
    @IsString()
    message: string

    rate: number
    eventId: number
    userId: number
}
