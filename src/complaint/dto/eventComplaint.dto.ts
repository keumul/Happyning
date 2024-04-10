import { IsNotEmpty} from "class-validator";

export class EventComplaintDto {
    eventId: number;

    @IsNotEmpty()
    categoryId: number;
}
