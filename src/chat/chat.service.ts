import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) { }

	async create(dto: MessageDto) {
		const newMessage = await this.prisma.message.create({
			data: {
				message: dto.message,
				eventId: +dto.chat,
				userId: +dto.user.id,
				latency: +dto.latency
			}
		});

		return await this.prisma.message.findUnique({
			where: {
				id: newMessage.id
			},
			select: {
				id: true,
				message: true,
				createdAt: true,
				user: {
					select: {
						id: true,
						username: true
					}
				},
				latency: true
			}
		});
	}

	async findAll(chatId: number) {
		return await this.prisma.message.findMany({
			where: {
				eventId: chatId
			},
			select: {
				id: true,
				message: true,
				createdAt: true,
				user: {
					select: {
						id: true,
						username: true
					}
				},
				latency: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});
	}
}