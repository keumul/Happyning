import { IsNotEmpty, IsString } from "class-validator";

export class LocationDto {
  @IsString()
  details: string;

  @IsNotEmpty()
  cityId: number;
}
