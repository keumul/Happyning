import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async findAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error){
      throw new ForbiddenException("Something went wrong", error);
    }
  }

  async findUser(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: +id
      }
    })

    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    return user;
  }

  async updateUser(id: number, dto: UserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: +id
        },
        data: {
          username: dto.username,
          email: dto.email,
          password: dto.password,
          bday: dto.bday,
        }
      })
      return user;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async removeUser(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: +id
        }
      })
      return user;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }
}
