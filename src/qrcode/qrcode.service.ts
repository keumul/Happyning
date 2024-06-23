import { Injectable } from '@nestjs/common';
import * as qrCode from 'qrcode';

@Injectable()
export class QrCodeService {
  constructor() { }
  async generateQrCode(data: string): Promise<string> {
    try {
      console.log('DATA:', data);
      const jsonData = JSON.parse(data);
      const formattedText = `
User Id: ${jsonData.userId};
Event Id: ${jsonData.eventId};
Event Title: ${jsonData.event?.title || 'N/A'};
Guest Amount: ${jsonData.guestAmount};
Created at: ${jsonData.createdAt}
    `.trim();
      const qrCodeImage = await qrCode.toDataURL(formattedText);
      return qrCodeImage;
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }

  async transformJson(json: any) {
    if (typeof json !== 'object' || json === null) {
      throw new Error('Input must be a non-null object');
    }

    const result = `
  Event Id: ${json.eventId},
  Event Title: ${json.event?.title || 'N/A'},
  User Id: ${json.userId}
  Guest Amount: ${json.guestAmount},
  Created at: ${json.createdAt},
    `.trim();

    return result;
  }
}