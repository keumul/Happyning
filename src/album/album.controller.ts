import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  createAlbum(@Body() dto: AlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Get()
  findAllAlbums() {
    return this.albumService.findAllAlbums();
  }

  @Get(':id')
  findAlbum(@Param() param: any) {
    return this.albumService.findAlbum(param.id);
  }

  @Patch(':id')
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: AlbumDto) {
    return this.albumService.updateAlbum(+id, updateAlbumDto);
  }

  @Delete(':id')
  removeAlbum(@Param('id') id: string) {
    return this.albumService.removeAlbum(+id);
  }
}
