import { ForbiddenException, Injectable, UploadedFile } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class PhotoService {
  constructor(private prisma: PrismaService) { }

  async uploadPhoto(id: number, uploadedPhoto: any) {
    try {
      
      const existingPhoto = await this.getPhoto(id);

      if(existingPhoto.length > 0) {
        await this.deletePhoto(existingPhoto[0].id);
      }

      await this.prisma.photo.create({
        data: {
          photo: uploadedPhoto.photo,
          eventId: +id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new ForbiddenException("Something went wrong when uploading photo: ", error.message);
    }
  }

  async getPhoto(id: number) {
    try {
      const photos = await this.prisma.photo.findMany({
        where: {
          eventId: +id,
        },
        select: {
          id: true,
        }
      });
      return photos;
    } catch (error) {
      console.log(error.message);
      throw new ForbiddenException("Something went wrong when fetching photos: ", error.message);
    }
  }

  async showPhoto(id: number) {
    try {
      const photo = await this.prisma.photo.findMany({
        where: {
          eventId: +id,
        },
        select: {
          photo: true,
        }
      });
      return photo[0].photo.toString();
      // return photo
    } catch (error) {
      console.log(error.message);
      throw new ForbiddenException("Something went wrong when fetching photo: ", error.message);
    }
  }

  async deletePhoto(id: number) {
    try {
      const photo = await this.prisma.photo.delete({
        where: {
          id: +id,
        },
      });
      return photo;
    } catch (error) {
      console.log(error.message);

      throw new ForbiddenException("Something went wrong when deleting photo: ", error.message);
    }
  }

}
