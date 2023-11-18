import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;
}
