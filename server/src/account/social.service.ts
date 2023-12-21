import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PatchSocialDto, SocialDto } from './dto';

@Injectable()
export class SocialService {
  constructor(private db: DbService){}

  async createSocial(userId: number):Promise<SocialDto>{
    return this.db.social.create({data:{userId}})
  }

  async patchSocial(userId: number, body: PatchSocialDto){  
    return this.db.social.update({where: {userId: userId}, data: {...body}})
  }
}
