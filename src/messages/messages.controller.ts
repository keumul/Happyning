import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './messages.service';
import { CurrentUser } from 'src/auth/decorator';

@Controller('chats/:id/message')
export class MessageController {
	constructor(private readonly messageService: MessageService) { }

	@Get()
	async getAll(@Param('id') id: number) {
		return await this.messageService.getAll(+id);
	}


	@Post()
	async create(
		@Param('id') chatId: number,
		@CurrentUser('id') userId: number,
		@Body() dto: MessageDto
	) {
		return await this.messageService.create(+chatId, +userId, dto)
	}
}