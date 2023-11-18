import { Injectable } from '@nestjs/common';
import { PhotoDto } from './dto/photo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhotoService {

  constructor(private prisma: PrismaService) { }
  
  // async uploadPhoto(dto: PhotoDto) {
  //   try {
  //     const photo = await this.prisma.photo.create({
  //       data: {
  //         photo: dto.photo,
  //         albumId: +dto.album,
  //       }
  //     })
  //     return photo;
  //   } catch (error) {
  
  //     console.error('Error in uploadPhoto:', error.message);
  //     throw new Error('Unable to upload photo');
  //   }
  // }

  // create(dto: PhotoDto) {
  //   return 'This action adds a new photo';
  // }

  // findAll() {
  //   return `This action returns all photo`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} photo`;
  // }

  // update(id: number, updatePhotoDto: UpdatePhotoDto) {
  //   return `This action updates a #${id} photo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} photo`;
  // }
}
