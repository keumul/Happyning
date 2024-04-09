import { IsNotEmpty, IsString } from "class-validator";

export class CityDto {
  @IsString()
  @IsNotEmpty()
  cityName: string;

  countryId: number;
}
