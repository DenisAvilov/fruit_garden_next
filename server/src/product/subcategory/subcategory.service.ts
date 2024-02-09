import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PostSubcategoryDto } from './postSubcategoryDto';

@Injectable()
export class SubcategoryService {
 constructor(
  private  bd: DbService
  ){}

  async getSubcategory(){    
  const subcategory = await this.bd.subcategory.findMany()
    return subcategory
}

  async createSubcategory(body: PostSubcategoryDto){    
  const subcategory = await this.bd.subcategory.create(
    {
      data: {
        name: body.name,
        categoryId: body.categoryId
      }
    })
    return subcategory
}
  async patchSubcategory(body: PostSubcategoryDto){    
  const subcategory = await this.bd.subcategory.update(
    {
     where: {id : body.categoryId},     
     data: {        
        name: body.name,       
      }  
    })
    return subcategory
}
  async deleteSubcategory(id: number){    
  return await this.bd.subcategory.delete({
    where: {id}
  })
    
}
}
