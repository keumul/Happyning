import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RateDto {
    @IsString()
    message: string

    @IsNumber()
    @IsNotEmpty()
    rate: number
    raterId: number
    ratedId: number
}
