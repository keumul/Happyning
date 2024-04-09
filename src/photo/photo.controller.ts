import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PhotoService } from "./photo.service";
import { PhotoDto } from "./dto/photo.dto";

@Controller("api/photos")
export class PhotoController {
    constructor(
        private readonly photoService: PhotoService,
    ) { }

    @Post('upload/:id')
    async uploadImage(@Param() params: any, @Body() dto: PhotoDto) {
        return await this.photoService.uploadPhoto(params.id, dto);
    }

}