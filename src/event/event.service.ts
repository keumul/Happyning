import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { EventDto } from "./dto/event.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RateDto } from "src/user/dto/rate.dto";
import { use } from "passport";


@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) { }

  async createEvent(dto: EventDto, user) {
    try {
      const event = await this.prisma.event.create({
        data: {
          title: dto.title,
          startDate: dto.startDate,
          description: dto.description,
          maxGuestAmount: +dto.maxGuestAmount,
          isPublic: dto.isPublic,
          location: dto.location,
          organizerId: user.id,
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

  async updateEvent(id: number, dto: EventDto, user) {
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
          organizerId: user.id,
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

  async rateEvent(id: number, dto: RateDto, user) {
    try {      
      const rate = await this.prisma.eventRating.create({
        data: {
          message: dto.message,
          rate: dto.rate,
          eventId: +id,
          userId: user.id,
        }
      })
      return rate;
    } catch (error) {
      throw new NotFoundException("Event does not exist", error);
    }
  }

  async viewEventRate(id: number) {
    try {
      const rate = await this.prisma.eventRating.findMany({
        where: {
          eventId: +id,
        },
      });
      return rate;
    } catch (error) {
      throw new NotFoundException("Event does not exist", error);
    }
  }

  async removeEventRate(id: number, user) {
    try {
      const rateOwner = await this.prisma.eventRating.findFirst({
        where: {
          id: +id,
        },
      });
      if (rateOwner.userId !== user.id) {
        throw new ForbiddenException("You can't delete this rate");
      }
      const rate = await this.prisma.eventRating.delete({
        where: {
          id: +id,
        },
      });
      return rate;
    } catch (error) {
      throw new NotFoundException("Event does not exist", error);
    }
  }

}
