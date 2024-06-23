import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
import { AdminGuard, JwtGuard } from "src/auth/guard";

@UseGuards(JwtGuard)
@Controller("api/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  createCategory(@Body() dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Get(":id")
  findOne(@Param() params: any) {
    return this.categoryService.findCategory(params.id);
  }

  @Patch(":id")
  @UseGuards(AdminGuard)
  updateCategory( @Param() params: any, @Body() dto: CategoryDto ) {
    return this.categoryService.updateCategory(params.id, dto);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  removeCategory(@Param("id") id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
