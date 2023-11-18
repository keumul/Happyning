import { IsString, MinLength } from 'class-validator';

export class MessageDto {
	@IsString()
	@MinLength(1, {
		message: 'Message must be at least 1 characters long'
	})
	content: string;
}