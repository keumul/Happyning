import { ForbiddenException, Injectable, UploadedFile } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PhotoDto } from "./dto/photo.dto";
@Injectable()
export class PhotoService {
    constructor(private prisma: PrismaService) { }

    async uploadPhoto( id: number, dto: PhotoDto){
        try {
        console.log("Image 1: ", dto.photo, dto.description, id);
          const photo = await this.prisma.photo.create({
            data: {
              photo: dto.photo,
              description: dto.description,
              eventId: +id,
            },
          });
      
          console.log("Image 2: ", photo);
      
          return photo;
        } catch (error) {
          throw new ForbiddenException("Something went wrong when uploading photo: ", error);
        }
      }
      
}
