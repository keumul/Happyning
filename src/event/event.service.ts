import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { EventDto } from "./dto/event.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) { }

  async createEvent(dto: EventDto) {
    try {
      const event = await this.prisma.event.create({
        data: {
          title: dto.title,
          startDate: dto.startDate,
          description: dto.description,
          maxGuestAmount: +dto.maxGuestAmount,
          isPublic: dto.isPublic,
          location: dto.location,
          organizerId: +dto.organizerId,
          categoryId: +dto.categoryId
        },
      });
      
      return event;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new NotFoundException("Refer to non-existent data");
        }
      }
    }
  }

  async findAllEvents() {
    try {
      const events = await this.prisma.event.findMany();
      return events;
    } catch (error) {
      throw new ForbiddenException("Something went wrong", error);
    }
  }

  async findEvent(id: number) {
    const event = await this.prisma.event.findFirst({
      where: {
        id: +id,
      },
    });

    if (!event) {
      throw new NotFoundException("Event does not exist");
    }
    return event;
  }

  async updateEvent(id: number, dto: EventDto) {
    try {
      const event = await this.prisma.event.update({
        where: {
          id: +id,
        },
        data: {
          title: dto.title,
          startDate: dto.startDate,
          description: dto.description,
          maxGuestAmount: +dto.maxGuestAmount,
          isPublic: dto.isPublic,
          location: dto.location,
          organizerId: +dto.organizerId,
          categoryId: +dto.categoryId,
        },
      });

      return event;
    } catch (error) {
      throw new ForbiddenException("Something went wrong", error);
    }
  }

  async removeEvent(id: number) {
    try {
      const event = await this.prisma.event.delete({
        where: {
          id: +id,
        },
      });
      return event;
    } catch (error) {
      throw new NotFoundException("Event does not exist", error);
    }
  }
}
