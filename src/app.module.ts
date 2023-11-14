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

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EventModule,
    CategoryModule,
  ],
  providers: [AppService],
})
export class AppModule {}
