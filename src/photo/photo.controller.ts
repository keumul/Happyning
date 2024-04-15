import { Body, Controller, Delete, Get, Header, Param, Post, Res, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PhotoService } from "./photo.service";

@Controller("api/photos")
export class PhotoController {
    constructor(
        private readonly photoService: PhotoService) { }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('photo'))
    async uploadImage(@Param() params: any, @Body() photo: Express.Multer.File) {
        return await this.photoService.uploadPhoto(params.id, photo);
    }

    @Get(':id')
    async getPhotos(@Param() params: any) {
        return await this.photoService.getPhoto(params.id);
    }

    @Get('show/:id')
    async showPhoto(@Param() params: any){
        return await this.photoService.showPhoto(params.id);
    }

    @Delete(':id')
    async deletePhoto(@Param() params: any) {
        return await this.photoService.deletePhoto(params.id);
    }
}