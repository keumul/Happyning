import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class EventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
		message: 'Too long title'
	})
  title: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsString()
  description: string;

  @IsNotEmpty()
  maxGuestAmount: number;

  @IsNotEmpty()
  isPublic: boolean;

  @IsNotEmpty()
  locationId: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  formatId: number;

  @IsNotEmpty()
  secretCode: string;

  @IsNotEmpty()
  ageLimit: number;
}
