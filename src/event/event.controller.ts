import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventDto } from "./dto/event.dto";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";
import { RateDto } from "src/user/dto/rate.dto";
import { JwtGuard, UserGuard } from "src/auth/guard";

@UseGuards(JwtGuard)
@Controller("api/events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(UserGuard)
  createEvent(@Body() eventDto: EventDto, @GetUser() user: User) {
    return this.eventService.createEvent(eventDto, user);
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
  @UseGuards(UserGuard)
  updateEvent(@Param("id") id: string, @Body() dto: EventDto, @GetUser() user: User) {
    return this.eventService.updateEvent(+id, dto, user);
  }

  @Delete(":id")
  removeEvent(@Param("id") id: string) {
    return this.eventService.removeEvent(+id);
  }

  @Post("rate/:id")
  @UseGuards(UserGuard)
  rateEvent(@Param() param: any, @Body() dto: RateDto, @GetUser() user: User) {
    return this.eventService.rateEvent(param.id, dto, user);
  }

  @Get("rate/:id")
  viewEventRate(@Param() param: any) {
    return this.eventService.viewEventRate(param.id);
  }

  @Delete("rate/:id")
  @UseGuards(UserGuard)
  removeEventRate(@Param() param: any, @GetUser() user: User) {
    return this.eventService.removeEventRate(param.id, user);
  }
}
