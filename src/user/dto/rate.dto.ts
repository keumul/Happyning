import { IsNotEmpty, IsString } from "class-validator";

export class RateDto {
    @IsString()
    message: string
    rate: number
    raterId: number
    ratedId: number
}
