import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { BrandDto, PatchBrandDto, PostBrandDto } from './branDto';

@Injectable()
export class BrandService {
 constructor(
  private  bd: DbService
  ){}

  async getBrand():Promise<BrandDto[]>{
   return  await this.bd.brand.findMany() 
}

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

 async patchBrand(data: PatchBrandDto):Promise<BrandDto>{
  const { name } = data;
  const brand = await this.bd.brand.update(
    { where: {id: data.id},
      data: {        
        name,        
      }
    })
   return {
      id: brand.id,
      name: brand.name,      
   }
}

async deleteBrand(id: number){  
  return await this.bd.brand.delete(
    { where: {id}      
    })   
}

}
