import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateCategoryDto, PostCategoryDto } from './postCategoryDto';

@Injectable()
export class CategoryService {

   constructor(
  private  db: DbService
  ){}

  async getCategory(){
  return  await this.db.category.findMany()  
  }

  async createCategory(body: CreateCategoryDto){
  const category =   await this.db.category.create(
    {
     data: {
        img: body.img,
        name: body.name,       
      }  
    })
  return category
  }

  async patchCategory(body: PostCategoryDto){
    try{
      if (!body.id || body.id.length === 0) {
      throw new BadRequestException('Id array must not be empty');
      }
  const category =   await this.db.category.update(
    {
      where: {id: parseInt(body.id)},
     data: {
        img: body.img,
        name: body.name,       
      }  
    })
  return category
    }
    catch(error){
      return error
    }
  }

    async deleteCategory(id: number){

  const productsWithCategory = await this.db.product.findMany({
    where: {
      categoryId: id,
    },
  });

 if (productsWithCategory.length > 0) {
    const productNames = productsWithCategory.map(product => product.name).join(', ');
    throw new BadRequestException(`Ця категорія використовується у наступних продуктах: ${productNames}. Вона не може бути видалена.`);
  }

  const category =   await this.db.category.delete(
    {
      where: {id}     
    })
  return category
  }
  
}
