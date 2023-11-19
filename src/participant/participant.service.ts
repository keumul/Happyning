import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantDto } from './dto/participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

//TODO: (странно) создание не работает без декоратора @IsNotEmpty у поля eventId/userId в dto 
//TODO: remove костыльный
@Injectable()
export class ParticipantService {

  constructor(private readonly prisma: PrismaService) {}

  async addParticipant(dto: ParticipantDto, user) {
    try {
      const guestAmount = await this.prisma.eventRegistrations.findMany({
        where: {
          eventId: +dto.eventId
        },
        select: {
          guestAmount: true
        }
      });
      const participant = await this.prisma.eventRegistrations.create({
        data: {
          guestAmount: guestAmount.length + 1,
          eventId: +dto.eventId,
          userId: user.id
        }
      });
      return participant;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new NotFoundException("Refer to non-existent data");
        }
      }
    }
  }

  async findAllEventParticipants(id: number) {
    try {
      const participants = await this.prisma.eventRegistrations.findMany({
        where: {
          eventId: +id
        },
        select: {
          guestAmount: true,
          userId: true
        }
      });
      return participants;
    } catch (error) {
      throw new ForbiddenException("Something went wrong", error);
    }
  }

  async findEventParticipant(eventId: number, dto: ParticipantDto) {
    const user = await this.prisma.eventRegistrations.findFirst({
      where: {
        eventId: +eventId,
        userId: +dto.userId
      }
    });
    if (!user || user === undefined) {
      throw new NotFoundException("Refer to non-existent data");
    }
    return user;

  }

  async removeEventParticipant(eventId: number, dto: ParticipantDto) {
    try {
      const user = await this.prisma.eventRegistrations.findFirst({
        where: {
          eventId: +eventId,
          userId: +dto.userId
        }
      });

      await this.prisma.eventRegistrations.delete({
        where: {
          id: user.id
        },
      });

      const lastEventRegistration = await this.prisma.eventRegistrations.findFirst({
        where: {
          eventId: +dto.eventId
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      const updatedEventRegistration = await this.prisma.eventRegistrations.update({
        where: {
          id: lastEventRegistration.id
        },
        data: {
          guestAmount: lastEventRegistration.guestAmount - 1
        }
      });
  
      return updatedEventRegistration;
    } catch (error) {
      throw new ForbiddenException("Something went wrong", error);
    }
  }
  
}
