import { Module } from '@nestjs/common';
import { MessageService } from './messages.service';
import { MessageController } from './messages.controller';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessagesModule {}
