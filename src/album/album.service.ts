import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {

  constructor(private readonly prisma: PrismaService) { }

  async createAlbum(dto: AlbumDto) {
    try {
      const album = await this.prisma.album.create({
        data: {
          title: dto.title,
          eventId: +dto.event,
        }
      })

      return album;
    } catch (error) {
      throw new ForbiddenException("Something went wrong", error);
    }
  }

  async findAllAlbums() {
    try {
      const albums = await this.prisma.album.findMany();
      return albums;
    } catch(error) {
      throw new ForbiddenException("Something went wrong", error);
    }
  }

  async findAlbum(id: number) {
    const album = await this.prisma.album.findFirst({
      where: {
        id: +id
      }, 
    })
    if(!album) {
      throw new NotFoundException("Album does not exist");
    }
    return album;
  }

  async updateAlbum(id: number, dto: AlbumDto) {
    try {
      const album = await this.prisma.album.update({
        where: {
          id: +id,
        },
        data: {
          title: dto.title,
          eventId: +dto.event,
        }
      })
      return album;
    } catch(error) {
      throw new NotFoundException("Album does not exist", error);
    }
  }

  async removeAlbum(id: number) {
    try {
      const album = await this.prisma.album.delete({
        where: {
          id: +id,
        }
      })
      return album;
    } catch(error) {
      new NotFoundException("Album does not exist", error);
    }
  }
}
