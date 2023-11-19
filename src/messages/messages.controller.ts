import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './messages.service';
import { GetUser } from 'src/auth/decorator';

@Controller('api/chats/:id/message')
export class MessageController {
	constructor(private readonly messageService: MessageService) { }

	@Get()
	async getAll(@Param('id') id: number) {
		return await this.messageService.getAll(+id);
	}

	@Post()
	async create( @Param('id') chatId: number, @GetUser() user: number, @Body() dto: MessageDto
	) {
		return await this.messageService.create(+chatId, user, dto)
	}
}