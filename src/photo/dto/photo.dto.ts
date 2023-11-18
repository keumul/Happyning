import { IsNumber } from "class-validator";

export class PhotoDto {
    photo: any;

    @IsNumber()
    album: number;

    @IsNumber()
    user: number;
}
