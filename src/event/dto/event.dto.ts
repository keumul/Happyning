import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class EventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20, {
		message: 'Too long title'
	})
  title: string;

  @IsNotEmpty()
  startDate: Date;

  @IsString()
  description: string;

  @IsNotEmpty()
  maxGuestAmount: number;

  @IsNotEmpty()
  isPublic: boolean;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  categoryId: number;

  @IsString()
  secretCode: string;
}
