import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { FormatService } from "./format.service";
import { FormatDto } from "./dto/format.dto";
import { AdminGuard, JwtGuard } from "src/auth/guard";

// @UseGuards(JwtGuard)
@Controller("api/formats")
export class FormatController {
  constructor(private readonly formatService: FormatService) {}

  @Post()
  // @UseGuards(AdminGuard)
  createFormat(@Body() dto: FormatDto) {
    return this.formatService.createFormat(dto);
  }

  @Get()
  findAllFormats() {
    return this.formatService.findAllFormats();
  }

  @Get(":id")
  findOne(@Param() params: any) {
    return this.formatService.findFormat(params.id);
  }

  @Patch(":id")
  // @UseGuards(AdminGuard)
  updateFormat( @Param("id") id: string, @Body() dto: FormatDto ) {
    return this.formatService.updateFormat(+id, dto);
  }

  @Delete(":id")
  // @UseGuards(AdminGuard)
  removeFormat(@Param("id") id: string) {
    return this.formatService.removeFormat(+id);
  }
}
