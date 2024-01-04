import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { BrandDto } from './branDto';
import { PostBrandDto } from './postBranDto';

@Injectable()
export class BrandService {
 constructor(
  private  bd: DbService
  ){}

  async createBrand(data: PostBrandDto):Promise<BrandDto>{
  const { name } = data;

  const brand = await this.bd.brand.create(
    {
      data: {        
        name,        
      }
    })

   return {
      id: brand.id,
      name: brand.name,      
   }
}

}
