import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class MailingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) { }

  public async sendMail(email: string, activationCode: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: this.configService.get('SMTP_USER'),
          pass: this.configService.get('SMTP_PASSWORD')
        }

      });
      
      const username = await this.prisma.user.findFirst({
        where: {
          username: email
        }
      });

      if (username.username === email) {
        email = username.email;
      }

      const mailOptions = {
        from: this.configService.get('SMTP_USER'),
        to: email,
        subject: 'Happyning | Activation Code',
        html: `
      <h1>Welcome to Happyning!</h1>
      <p>Your activation code: <b>${activationCode}</b></p>
  `
      }
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new ForbiddenException('Something went wrong when sending email: ', error.message);
    }
  }

}

