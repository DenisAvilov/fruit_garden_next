import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ContactDto, PatchContactDto } from './dto';



@Injectable()
export class ContactService {
  constructor(private db: DbService){}
  async  createContact(userId: number): Promise<ContactDto>{
   return await this.db.contact.create({data: {userId}})
  }

  async patchContact(userId: number, body: PatchContactDto){
    return await this.db.contact.update({where: {userId: userId}, data:{...body}})
  }
}
