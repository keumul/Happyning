import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },

      }),
      limits: {
        fileSize: 1024 * 1024 * 10, 
      },
    }),
  ],
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}

