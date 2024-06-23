import { IsNotEmpty } from "class-validator";

export class PreferenceDto {
    userId: number;

    @IsNotEmpty()
    categoryId: number;

    @IsNotEmpty()
    formatId: number;
}