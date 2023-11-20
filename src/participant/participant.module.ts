import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { QrCodeService } from 'src/qrcode/qrcode.service';

@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService, QrCodeService],
})
export class ParticipantModule {}
