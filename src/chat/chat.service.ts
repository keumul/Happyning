import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) { }

	async create(dto: MessageDto) {
		const newMessage = await this.prisma.message.create({
			data: {
				message: dto.content,
				eventId: +dto.chat,
				userId: +dto.user
			}
		});

		return await this.prisma.message.findUnique({
			where: {
				id: newMessage.id
			},
			select: {
				message: true,
				createdAt: true,
				user: {
					select: {
						username: true
					}
				}
			}
		});
	}

	async findAll(chatId: number) {
		return await this.prisma.message.findMany({
			where: {
				eventId: chatId
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
}