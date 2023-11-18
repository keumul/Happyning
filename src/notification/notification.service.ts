import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) { }

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


}
