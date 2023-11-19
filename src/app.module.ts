import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { EventModule } from "./event/event.module";
import { CategoryModule } from "./category/category.module";
import { MessagesModule } from './messages/messages.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EventModule,
    CategoryModule,
    MessagesModule,
    ChatModule,
    NotificationModule,
    AlbumModule,
    PhotoModule,
    UserModule,
    ParticipantModule,
  ],
  providers: [AppService],
})
export class AppModule { }
