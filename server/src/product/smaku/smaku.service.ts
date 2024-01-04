import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SmaksDto } from './smakuDto';

@Injectable()
export class SmakuService {

 constructor(
  private db: DbService,

  ) {}
 
   async createSmak(name: string, ): Promise<SmaksDto> {
    const newSmak = await this.db.smaks.create({
      data: {
        name,        
      },
    });
    return newSmak;
  }

   async getSmaks():Promise<SmaksDto[]> {
    const smak = await this.db.smaks.findMany();
    return smak;
  }

  async getSmakById(id: number): Promise<SmaksDto | null> {
    const smak = await this.db.smaks.findUnique({
      where: {
        id,
      },
    });
    return smak;
  }

  async updateSmak(id: number, newName: string,): Promise<SmaksDto> {
    const updatedSmak = await this.db.smaks.update({
      where: {
        id,
      },
      data: {
        name: newName,        
      },
    });
    return updatedSmak;
  }

  async deleteSmak(id: number): Promise<SmaksDto | null> {
    const deletedSmak = await this.db.smaks.delete({
      where: {
        id,
      },
    });
    return deletedSmak;
  }
}
