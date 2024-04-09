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
import { UserModule } from './user/user.module';
import { ParticipantModule } from './participant/participant.module';
import { QrCodeModule } from './qrcode/qrcode.module';
import { ScheduleModule } from "@nestjs/schedule";
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { FormatModule } from './format/format.module';
import { LocationModule } from './location/location.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    EventModule,
    CategoryModule,
    MessagesModule,
    ChatModule,
    NotificationModule,
    UserModule,
    ParticipantModule,
    QrCodeModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MailingModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    FormatModule,
    LocationModule,
    PhotoModule,
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule { }
