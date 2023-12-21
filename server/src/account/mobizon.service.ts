import { Injectable } from '@nestjs/common';
import { mobizon } from 'mobizon-node'

@Injectable()
export class MobizonService {
  constructor(){
     mobizon.setConfig({
      apiServer: process.env.API_SERVER_MOBIZON || 'https://api.mobizon.ua',
      apiKey: process.env.API_KEY_MOBIZON || '',
      format: 'json',
    });
  }


  async sendSms(recipient: string, text: string) {
    try {
      const sendSms = await mobizon.sendSms({
        recipient,
        from: '',
        text,
      });
      console.log('SMS відправлено:', sendSms);
    } catch (error) {
      console.error('Помилка відправлення SMS:', error);
      throw error;
    }
  }
}
