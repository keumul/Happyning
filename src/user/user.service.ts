import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RateDto } from './dto/rate.dto';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async findAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
      console.log(users);
      
      return users;
    } catch (error) {
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

  async rateUser(id: number, dto: RateDto, user) {
    try {
      const rate = await this.prisma.userRating.create({
        data: {
          message: dto.message,
          rate: dto.rate,
          rater: { connect: { id: user.id } },
          rated: { connect: { id: +id } },
        }
      })
      return rate;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async findCurrentUserRate(user) {
    try {
      const rate = await this.prisma.userRating.findMany({
        where: {
          ratedId: +user.id
        }
      })
      return rate;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async viewUserRate(id: number) {
    try {
      const rate = await this.prisma.userRating.findMany({
        where: {
          ratedId: +id
        }
      })
      return rate;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async removeUserRate(id: number, user) {
    try {
      const rate = await this.prisma.userRating.deleteMany({
        where: {
          raterId: +user.id,
          ratedId: +id
        }
      })
      return rate;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }
}
