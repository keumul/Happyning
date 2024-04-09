import { IsNotEmpty, IsString } from "class-validator";

export class FormatDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;
}
