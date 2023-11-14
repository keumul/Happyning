import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;
}
