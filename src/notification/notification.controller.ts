import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  createNotification(@Body() dto: NotificationDto) {
    return this.notificationService.createNotification(dto);
  }

  @Get()
  findAllNotifications() {
    return this.notificationService.findAllNotifications();
  }

  @Get(':id')
  pickNotification(@Param('id') id: string) {
    return this.notificationService.pickNotification(+id);
  }

  @Get(':id')
  revertNotification(@Param('id') id: string) {
    return this.notificationService.revertNotification(+id);
  }
}
