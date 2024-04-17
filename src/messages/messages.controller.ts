import { Controller, Delete, Param } from '@nestjs/common';
import { MessageService } from './messages.service';

@Controller('api/message')
export class MessageController {
	constructor(private readonly messageService: MessageService) { }

	@Delete(':id')
	async delete(@Param('id') id: number) {
		return await this.messageService.delete(+id);
	}
}