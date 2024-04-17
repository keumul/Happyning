import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) { }

	async delete(id: number) {
		return await this.prisma.message.delete({
			where: {
				id: +id
			}
		});
	}
}