import { Injectable } from '@nestjs/common';
import * as qrCode from 'qrcode';

@Injectable()
export class QrCodeService {
    constructor() {}
  async generateQrCode(data: string): Promise<string> {
    try {
      const qrCodeImage = await qrCode.toDataURL(data);
      return qrCodeImage;
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }
  
}