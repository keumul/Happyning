import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';

@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  createNotification(@Body() dto: NotificationDto) {
    return this.notificationService.createNotification(dto);
  }

  @Get('user/:id')
  findAllUserNotifications(@Param('id') id: number) {
    return this.notificationService.findAllUserNotifications(+id);
  }

  @Get(':id')
  pickNotification(@Param('id') id: number) {
    return this.notificationService.pickNotification(+id);
  }
}
