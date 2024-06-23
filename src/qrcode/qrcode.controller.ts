import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { QrCodeService } from './qrcode.service';
import { EventService } from 'src/event/event.service';

@Controller('api/events')
export class QrCodeController {
  constructor(
    private readonly eventService: EventService,
    private readonly qrCodeService: QrCodeService,
  ) {}

  @Get('generate-qrcode/:id')
  async generateQrCode(@Param('id') id: string, @Res() res: Response) {
    try {
      const event = await this.eventService.findEvent(+id);
      console.log(event);
      const qrCodeImage = await this.qrCodeService.generateQrCode(event.id.toString());
      res.status(200).send(qrCodeImage);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}