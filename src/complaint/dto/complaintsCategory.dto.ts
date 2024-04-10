import { IsString} from "class-validator";

export class ComplaintsCategoryDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}
