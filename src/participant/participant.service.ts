import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantDto } from './dto/participant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { QrCodeService } from 'src/qrcode/qrcode.service';

@Injectable()
export class ParticipantService {

  constructor(private readonly prisma: PrismaService,
    private readonly qrCodeService: QrCodeService) { }

  async addParticipant(dto: ParticipantDto, user) {
    const participant = await this.prisma.eventRegistrations.findFirst({
      where: {
        eventId: +dto.eventId,
        userId: user.id
      }
    });

    if (participant) {
      throw new ForbiddenException("You are already registered for this event");
    }

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
      await this.sendQrCodeNotification(user.id, +dto.eventId);

      return participant;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          throw new NotFoundException("Refer to non-existent data");
        }
      }
    }
  }

  private async sendQrCodeNotification(userId: number, eventId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      const event = await this.prisma.event.findUnique({
        where: { id: eventId },
      });

      if (!user || !event) {
        throw new Error('User or event not found');
      }

      const participant = await this.prisma.eventRegistrations.findFirst({
        where: {
          eventId: event.id,
          userId: user.id
        },
        include: {
          event: {
            select: {
              title: true
            }
          }
        }
      });

      const qrCodeImage = await this.qrCodeService.generateQrCode(JSON.stringify(participant));
      await this.prisma.notification.create({
        data: {
          message: 'QR-code for event registration is ready!',
          userId: user.id,
          eventId: event.id,
          isRead: false,
          qrCode: qrCodeImage,
        },
      });
    } catch (error) {
      throw new Error(`Failed to send QR code notification: ${error.message}`);
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
      throw new ForbiddenException("Something went wrong when fetchin all event participants: ", error);
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

  async findUserEvents(userId: number) {
    const participantEvents = await this.prisma.eventRegistrations.findMany({
      where: {
        userId: +userId,
      },
      include: {
        event: true,
      },
    });

    return participantEvents;
  }


  async removeEventParticipant(eventId: number, user) {
    try {

      const event = await this.prisma.event.findUnique({
        where: {
          id: +eventId
        }
      });

      if (!event) {
        throw new NotFoundException("Refer to non-existent data");
      }

      const eventRegistration = await this.prisma.eventRegistrations.findFirst({
        where: {
          eventId: +eventId,
          userId: +user.id
        }
      });

      if (!eventRegistration) {
        throw new NotFoundException("Refer to non-existent data");
      }

      const deletedEventRegistration = await this.prisma.eventRegistrations.delete({
        where: {
          id: eventRegistration.id
        }
      });

      return deletedEventRegistration;
    } catch (error) {
      console.log(error);

      throw new ForbiddenException("Something went wrong when removing event participant: ", error);
    }
  }
}
