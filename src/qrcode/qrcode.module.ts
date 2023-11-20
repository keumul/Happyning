import { Module } from '@nestjs/common';
import { QrCodeService } from './qrcode.service';
import { QrCodeController } from './qrcode.controller';
import { EventService } from 'src/event/event.service';

@Module({
  controllers: [QrCodeController],
  providers: [QrCodeService,  EventService]
})
export class QrCodeModule {}
