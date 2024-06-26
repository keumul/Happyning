import { Module } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { PreferenceController } from './preference.controller';

@Module({
  providers: [PreferenceService],
  controllers: [PreferenceController]
})
export class PreferenceModule {}
