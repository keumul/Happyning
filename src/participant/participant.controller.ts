import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantDto } from './dto/participant.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('api/participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  addParticipant(@Body() dto: ParticipantDto, @GetUser() user: User) {
    return this.participantService.addParticipant(dto, user);
  }

  @Get(':id')
  findAllEventParticipants(@Param() event: any) {
    return this.participantService.findAllEventParticipants(event.id);
  }

  @Get('user/:id')
  findEventParticipant(@Param() event: any, @Body() dto: ParticipantDto) {
    return this.participantService.findEventParticipant(event.id, dto);
  }

  @Delete(':id')
  removeEventParticipant(@Param() event: any, @Body() dto: ParticipantDto) {
    return this.participantService.removeEventParticipant(event.id, dto);
  }
}
