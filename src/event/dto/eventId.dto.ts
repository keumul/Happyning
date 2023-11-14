import { IsNotEmpty} from "class-validator";

export class EventIdDto {

  @IsNotEmpty()
  id: number;
}
