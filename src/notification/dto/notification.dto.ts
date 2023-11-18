import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NotificationDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsNotEmpty()
    user: number;

    event: number;
    
    isRead: boolean;
}
