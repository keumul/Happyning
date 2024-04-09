import { IsString } from "class-validator";

export class PhotoDto {
  photo: string;

  description: string;

  eventId: number;
}