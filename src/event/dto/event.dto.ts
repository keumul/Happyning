import { IsNotEmpty, IsString } from "class-validator";

export class EventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  startDate: Date;

  @IsString()
  description: string;

  @IsNotEmpty()
  maxGuestAmount: number;

  isPublic: boolean;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  categoryId: number;
}
