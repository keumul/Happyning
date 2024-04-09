import { Controller, Post } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('api/mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
}
