import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { EventDto } from "./dto/event.dto";
import { EventIdDto } from "./dto/eventId.dto";

@Controller("api/events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(@Body() eventDto: EventDto) {
    return this.eventService.createEvent(eventDto);
  }

  @Get()
  findAllEvents() {
    return this.eventService.findAllEvents();
  }

  @Get(":id")
  findEvent(@Param() params: any) {
    return this.eventService.findEvent(params.id);
  }

  @Patch(":id")
  updateEvent(@Param("id") id: string, @Body() dto: EventDto) {
    return this.eventService.updateEvent(+id, dto);
  }

  @Delete(":id")
  removeEvent(@Param("id") id: string) {
    return this.eventService.removeEvent(+id);
  }
}
