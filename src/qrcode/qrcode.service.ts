import { Injectable } from '@nestjs/common';
import * as qrCode from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QrCodeService {
    constructor(private prisma: PrismaService) {}
  async generateQrCode(data: string): Promise<string> {
    try {
      const qrCodeImage = await qrCode.toDataURL(data);
      return qrCodeImage;
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }
}