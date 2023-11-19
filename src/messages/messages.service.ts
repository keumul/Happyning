import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
	constructor(private prisma: PrismaService) { }

	async getAll(id: number) {
		return await this.prisma.message.findMany({
			where: {
				eventId: id
			},
			select: {
				message: true,
				createdAt: true,
				user: {
					select: {
						username: true
					}
				}
			},
			orderBy: {
				createdAt: 'asc'
			}
		});
	}

	async create(chatId: number, user, dto: MessageDto) {
		return await this.prisma.message.create({
			data: {
				message: dto.content,
				eventId: chatId,
				userId: user.id
			}
		});
	}
}