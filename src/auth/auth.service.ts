import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, LoginDto } from "./dto";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from '@prisma/client';
import { MailingService } from "src/mailing/mailing.service";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailing: MailingService,
  ) { }

  token: String;

  async signup(dto: AuthDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: dto.email },
            { username: dto.username }
          ]
        }
      });

      if (existingUser) {
        throw new BadRequestException('User already exists')
      }

      const newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: await hash(dto.password),
          bday: dto.bday,
          role: dto.role,
          isConfirmed: false
        },
      });

      await this.mailing.sendMail(dto.email, newUser.activationCode);

      return newUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signin(dto: LoginDto) {
    const user = await this.validateUser(dto);

    console.log(dto);

    if (!user) {
      throw new ForbiddenException("User not found");
    } else if (user.activationCode === null) {
      throw new ForbiddenException("Check email to activate your account");
    }

    const isPasswordCorrect = await verify(user.password, dto.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException("Password is incorrect");
    }

    if (!user.isConfirmed && dto.activationCode != "nocode") {
      if (user.activationCode.toLowerCase() === dto.activationCode.toLowerCase()) {


        await this.prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            isConfirmed: true
          }
        });
        return this.signToken(user.id, user.username, user.role, user.isConfirmed)

      } else {
        throw new ForbiddenException("Verification code is incorrect");
      }

    }
    if (!user.isConfirmed && dto.activationCode == "nocode") {
      return this.signToken(user.id, user.username, user.role, user.isConfirmed)
    } else if (user.isConfirmed) {
      return this.signToken(user.id, user.username, user.role, user.isConfirmed)
    }

  }

  async signToken(
    userId: number,
    username: string,
    role: string,
    isConfirmed: boolean
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
      role,
      isConfirmed
    };

    const secret = this.config.get("JWT_SECRET");
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "5h",
      secret: secret,
    });
    console.log(token);

    return {
      access_token: token,
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordCorrect = await verify(user.password, dto.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException('Wrong password!');
    }

    return user;
  }

  async activate(activationCode: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        activationCode
      }
    });

    if (!user) {
      throw new NotFoundException('Activation code not found');
    }

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        activationCode: null
      }
    });

    const token = await this.signToken(user.id, user.username, user.role, user.isConfirmed);

    return {
      user: this.returnUserFields,
      ...token
    }
  }

  async confirmationStatus(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.isConfirmed;
  }

  async resendActivationCode(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.mailing.sendMail(username, user.activationCode);

    return user;
  }


  private returnUserFields(user: User) {
    return {
      username: user.username,
      id: user.id,
      role: user.role
    }
  }
}
