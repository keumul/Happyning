import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { EventDto } from "./dto/event.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as moment from 'moment-timezone';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) { }

  async createEvent(dto: EventDto, user) {
    try {
      const startDateInMinsk = moment.tz(dto.startDate, 'Europe/Minsk').toDate();
      if (startDateInMinsk < new Date()) {
        throw new ForbiddenException("You can't create an event in the past");
      }
      const event = await this.prisma.event.create({
        data: {
          title: dto.title,
          startDate: startDateInMinsk,
          endDate: dto.endDate,
          description: dto.description,
          maxGuestAmount: +dto.maxGuestAmount,
          isPublic: Boolean(dto.isPublic),
          locationId: +dto.locationId,
          ageLimit: +dto.ageLimit,
          organizerId: +user.id,
          categoryId: +dto.categoryId,
          formatId: +dto.formatId,
          secretCode: dto.secretCode,
        },
      });

      await this.prisma.notification.create({
        data: {
          message: 'Event successfuly created!',
          userId: +user.id,
          eventId: +event.id,
          isRead: true,
        },
      });
      return event;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new NotFoundException("Refer to non-existent data");
        }
      } else {
        throw new ForbiddenException("Something went wrong when creating event: ", error.message);
      }
    }
  }

  async findAllEvents() {
    try {
      const events = await this.prisma.event.findMany();
      return events;
    } catch (error) {
      throw new ForbiddenException("Something went wrong when fetching events: ", error.message);
    }
  }

  async findUserEvents(id: number) {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          organizerId: +id,
        },
      });
      return events;
    } catch (error) {
      throw new ForbiddenException("Something went wrong when fetching user events: ", error.message);
    }
  }

  async findEvent(id: number) {
    const event = await this.prisma.event.findFirst({
      where: {
        id: +id,
      }
    });

    if (!event) {
      throw new NotFoundException("Something went wrong when fetching event");
    }
    return event;
  }

  async updateEvent(id: number, dto: EventDto, user) {
    try {
      const startDateInMinsk = moment.tz(dto.startDate, 'Europe/Minsk').toDate();
      if (startDateInMinsk < new Date()) {
        throw new ForbiddenException("You can't create an event in the past");
      }

      const event = await this.prisma.event.update({
        where: {
          id: +id,
        },
        data: {
          title: dto.title,
          startDate: startDateInMinsk,
          description: dto.description,
          maxGuestAmount: +dto.maxGuestAmount,
          isPublic: dto.isPublic,
          locationId: +dto.locationId,
          ageLimit: +dto.ageLimit,
          organizerId: user.id,
          categoryId: +dto.categoryId,
          formatId: +dto.formatId,
          secretCode: dto.secretCode,
        },
      });

      return event;
    } catch (error) {
      throw new ForbiddenException("Something went wrong when updating event: ", error.message);
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
      throw new NotFoundException("Something went wrong when deleting event: ", error.message);
    }
  }
}
