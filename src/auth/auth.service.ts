import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        const hashedPassword = await argon.hash(dto.password);

        try {

            const newUser = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    email: dto.email,
                    password: hashedPassword,
                    bday: dto.bday
                }
            })

            return this.signToken(newUser.id, newUser.username, newUser.isAdmin);
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Username or email already exists',);
                }
            }
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username
            }
        })

        if (!user) {
            throw new ForbiddenException('User not found');
        }

        const isPasswordCorrect = await argon.verify(user.password, dto.password);

        if (!isPasswordCorrect) {
            throw new ForbiddenException('Password is incorrect');
        }

        return this.signToken(user.id, user.username, user.isAdmin);
    }

    async signToken(
        userId: number,
        username: string,
        isAdmin: boolean
    ): Promise<{ access_token: string }> {

        const payload = {
            sub: userId,
            username,
            isAdmin
        }

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '5h',
            secret: secret
        });

        return {
            access_token: token,
        }
    }
}