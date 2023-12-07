import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ContactDto } from './contactDto';

@Injectable()
export class ContactService {
  constructor(private db: DbService){}

  async  createContact(userId: number): Promise<ContactDto>{
   return await this.db.contact.create({data: {userId}})
  }
}
