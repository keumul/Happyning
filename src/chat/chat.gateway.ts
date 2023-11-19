import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { log } from 'console';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(private readonly chatService: ChatService ) { 
		log('ChatGateway constructor');
	}

	async handleConnection(socket: Socket) {
		log('ChatGateway handleConnection');
		const chatId = socket.handshake.query.chatId;
		socket.join(`discussion-${chatId}`);
		const messages = await this.chatService.findAll(+chatId);
		socket.emit('loadMessages', messages);
	}

	async handleDisconnect(socket: Socket) {
		const chatId = socket.handshake.query.chatId;
		socket.leave(`discussion-${chatId}`);
	}

	async sendMessage(dto: MessageDto) {
		const message = await this.chatService.create(dto);
		log(message);
		this.server.to(`discussion-${dto.chat}`).emit('newMessage', message);
	}

	@SubscribeMessage('writeMessage')
	async onMessage(client: Socket, dto: MessageDto) {
		log(dto)
		await this.sendMessage(dto);
	}
}