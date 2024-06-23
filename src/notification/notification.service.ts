import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  createNotification(eventId: number, userId: number, dto: NotificationDto) {
    const notification = this.prisma.notification.create({
      data: {
        message: dto.message,
        userId: +userId,
        eventId: +eventId,
        isRead: false
      }
    })
    return notification;
  }

  findAllUserNotifications(id: number) {
    const notifications = this.prisma.notification.findMany({
      where: {
        userId: id
      },
      include: {
        event: true
      }
    });
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

  deleteNotification(id: number) {
    const notification = this.prisma.notification.delete({
      where: {
        id: +id
      }
    })
    return notification;
  }
}
