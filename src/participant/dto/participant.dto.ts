import { IsNotEmpty } from "class-validator";

export class ParticipantDto {
    guestAmount: number;

    @IsNotEmpty()
    eventId: number;

    @IsNotEmpty()
    userId: number;
}
