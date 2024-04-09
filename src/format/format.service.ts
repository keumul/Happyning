import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { FormatDto } from "./dto/format.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FormatService {
  constructor(private readonly prisma: PrismaService) { }

  async createFormat(dto: FormatDto) {
    try {
    const format = await this.prisma.format.create({
      data: {
        title: dto.title,
        description: dto.description
      },
    });
    return format;
  } catch(error) {
    throw new ForbiddenException("Something went wrong when creating the format", error);
  }
  }

  async findAllFormats() {
    try {
      const formats= await this.prisma.format.findMany();
      return formats;
    } catch (error) {
      throw new ForbiddenException("Something went wrong when finding the format", error);
    }
  }

  async findFormat(id: number) {
    const format = await this.prisma.format.findFirst({
      where: {
        id: +id,
      },
    });

    if (!format) {
      throw new NotFoundException("Format does not exist");
    }

    return format;
  }

  async updateFormat(id: number, dto: FormatDto) {
    try {
      const format = await this.prisma.format.update({
        where: {
          id: +id,
        },
        data: {
          title: dto.title,
          description: dto.description,
        },
      });
      return format;
    } catch (error) {
      throw new NotFoundException("Format does not exist", error);
    }
  }

  async removeFormat(id: number) {
    try {
      const format = await this.prisma.format.delete({
        where: {
          id: +id,
        }
      })
      return format;
    }
    catch (error) {
      throw new NotFoundException("Format does not exist", error);
    }
  }
}
