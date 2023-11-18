import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user/user.controller";
import { EventController } from "./event/event.controller";
import { EventModule } from "./event/event.module";
import { CategoryModule } from "./category/category.module";
import { MessagesModule } from './messages/messages.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import { AlbumModule } from './album/album.module';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { ChatGateway } from "./chat/chat.gateway";
import { ChatService } from "./chat/chat.service";

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
  ],
  providers: [AppService],
})
export class AppModule { }
