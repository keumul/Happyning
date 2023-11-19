import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoDto } from './dto/photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) { }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('photoURL'))
  // upload(
  //   @UploadedFile() file: Express.Multer.File,
  //   dto: PhotoDto
  // ) {
  //   return this.photoService.uploadPhoto(dto, file);
  // }

  // // @Post('upload')
  // // @UseInterceptors(FileInterceptor('file'))
  // // uploadFile(@UploadedFile() file: Express.Multer.File) {
  // //   console.log(file);
  // // }

  // @Post()
  // create(@Body() createPhotoDto: PhotoDto) {
  //   return this.photoService.create(createPhotoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.photoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.photoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoDto: PhotoDto) {
  //   return this.photoService.update(+id, updatePhotoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.photoService.remove(+id);
  // }
}
