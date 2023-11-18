import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
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
  update(
    @Param("id") id: string,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.updateCategory(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
