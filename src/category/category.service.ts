import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryDto } from "./dto/category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) { }

  async createCategory(dto: CategoryDto) {
    try {
    const category = await this.prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
    return category;
  } catch(error) {
    throw new ForbiddenException("Something went wrong", error);
  }
  }

  async findAllCategories() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw new ForbiddenException("Something went wrong", error);
    }
  }

  async findCategory(id: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id: +id,
      },
    });

    if (!category) {
      throw new NotFoundException("Category does not exist");
    }

    return category;
  }

  async updateCategory(id: number, dto: CategoryDto) {
    try {
      const category = await this.prisma.category.update({
        where: {
          id: +id,
        },
        data: {
          title: dto.title,
          description: dto.description,
        },
      });
      return category;
    } catch (error) {
      throw new NotFoundException("Category does not exist", error);
    }
  }

  async removeCategory(id: number) {
    try {
      const category = await this.prisma.category.delete({
        where: {
          id: +id,
        }
      })
      return category;
    }
    catch (error) {
      throw new NotFoundException("Event does not exist", error);
    }
  }
}
