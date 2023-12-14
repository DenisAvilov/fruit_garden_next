import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SocialDto } from './dto';

@Injectable()
export class SocialService {
  constructor(private db: DbService){}

  async createSocial(userId: number):Promise<SocialDto>{
    return this.db.social.create({data:{userId}})
  }
}
