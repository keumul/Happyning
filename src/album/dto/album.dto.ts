import { IsNotEmpty, IsString } from "class-validator";

export class AlbumDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    event: number;
}
