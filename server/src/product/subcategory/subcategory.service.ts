import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PostSubcategoryDto } from './postSubcategoryDto';

@Injectable()
export class SubcategoryService {
 constructor(
  private  bd: DbService
  ){}
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
}
