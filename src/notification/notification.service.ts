import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QrCodeService } from 'src/qrcode/qrcode.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  createNotification(dto: NotificationDto) {
    const notification = this.prisma.notification.create({
      data: {
        message: dto.message,
        userId: +dto.user,
        eventId: +dto.event,
        isRead: false
      }
    })
    return notification;
  }

  findAllNotifications() {
    const notifications = this.prisma.notification.findMany();
    return notifications;
  }

  pickNotification(id: number) {
    const notification = this.prisma.notification.update({
      where: {
        id: +id
      },
      data: {
        isRead: true
      }
    })

    return notification;
  }

  revertNotification(id: number) {
    const notification = this.prisma.notification.update({
      where: {
        id: +id
      },
      data: {
        isRead: false
      }
    })

    return notification;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async sendScheduledNotifications() {
    try {
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

      const notificationsToSend = await this.prisma.notification.findMany({
        where: {
          event: {
            startDate: {
              gte: oneHourFromNow,
            },
          },
          isRead: false,
        },
        include: {
          event: true,
        },
      });

      for (const notification of notificationsToSend) {
        this.pickNotification(notification.id);
        console.log('Sending notification:', notification);
      }
    } catch (error) {
      console.error('Failed to send scheduled notifications:', error);
    }
  }
}
