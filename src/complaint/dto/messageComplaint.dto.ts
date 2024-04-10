import { IsNotEmpty} from "class-validator";

export class MessageComplaintDto {
    messageId: number;

    @IsNotEmpty()
    categoryId: number;
}
