import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NotificationDto {
    @IsString()
    @IsNotEmpty()
    message: string;
    isRead: boolean;
}
