import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RateDto } from './dto/rate.dto';
import * as argon from "argon2";

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async findAllUsers() {
    try {
      const users = await this.prisma.user.findMany();
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
      const hashedPassword = await argon.hash(dto.password);
      const user = await this.prisma.user.update({
        where: {
          id: +id
        },
        data: {
          username: dto.username,
          email: dto.email,
          password: hashedPassword,
          bday: dto.bday,
        }
      })
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException("Username and email must be unique", error);
      } else {
        throw new NotFoundException("Something went wrong", error);
      }
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

  async rateUser(userId: number, eventId:number, dto: RateDto, user) {
    try {

      const rateuser = await this.prisma.userRating.create({
        data: {
          message: dto.message,
          rater: { connect: { id: +user.id } },
          rated: { connect: { id: +userId } },
          rate: +dto.rate,
          event: { connect: { id: +eventId } }
        }
      })

      await this.prisma.notification.create({
        data: {
          message: 'User ' + user.username + ' rated your event ' + dto.eventId + ' for a score of ' + dto.rate,
          userId: +userId,
          eventId: +eventId,
          isRead: false,
        },
      });

      return rateuser;
    } catch (error) {
      console.log(error);

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

  async findAllUserRates() {
    try {
      const rate = await this.prisma.userRating.findMany()
      return rate;
    } catch (error) {
      throw new NotFoundException("Something wrong when fetching user rates: ", error);
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

  async addModerator(id: number) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: +id
        },
        data: {
          role: 'moderator'
        }
      })
      return user;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async removeModerator(id: number) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: +id
        },
        data: {
          role: 'user'
        }
      })
      return user;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async banUser(id: number) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: +id
        },
        data: {
          role: 'banned'
        }
      })
      return user;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async unbanUser(id: number) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: +id
        },
        data: {
          role: 'user'
        }
      })
      return user;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }

  async findOrganizerEvents(id: number) {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          organizerId: +id
        }
      })
      return events;
    } catch (error) {
      throw new NotFoundException("User does not exist", error);
    }
  }
}
