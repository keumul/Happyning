import { Module } from '@nestjs/common';
import { FormatService } from './format.service';
import { FormatController } from './format.controller';

@Module({
  providers: [FormatService],
  controllers: [FormatController]
})
export class FormatModule {}
