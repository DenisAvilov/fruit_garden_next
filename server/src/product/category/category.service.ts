import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PostCategoryDto } from './postCategoryDto';

@Injectable()
export class CategoryService {

   constructor(
  private  bd: DbService
  ){}

  async createCategory(body: PostCategoryDto){
  const category =   await this.bd.category.create(
    {
     data: {
        img: body.img,
        name: body.name,       
      }  
    })
  return category
  }
}
