import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
// import { CookieService } from 'src/auth/cookie.service';
import { ProductDto } from './productDto';
// import { Response } from 'express'
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';

import { AttributeDto, AttributesDto, PostProductDto} from './postProductDto';
import { ProductService } from './product.service';
import { BrandService } from './brand/brand.service';
import { BrandDto } from './brand/branDto';
import { PostBrandDto } from './brand/postBranDto';
import { CategoryService } from './category/category.service';
import { CategoryDto } from './category/categoryDto';
import { PostCategoryDto } from './category/postCategoryDto';
import { SubcategoryDto } from './subcategory/subcategoryDto';
import { PostSubcategoryDto } from './subcategory/postSubcategoryDto';
import { SubcategoryService } from './subcategory/subcategory.service';

import { SmaksDto } from './smaku/smakuDto';
import { PostSmaksDto } from './smaku/postSmakuDto';
import { SmakuService } from './smaku/smaku.service';
import { RatingService } from './rating/rating.service';
import { RatingDto } from './rating/rating.Dto';
import { PostRatingDto } from './rating/postRating.Dto';
import { PatchSmakDto } from './smaku/patchSmakDto';
// import { PriceDto } from './price/priceDto';
// import { CreatePriceDto } from './price/createPriceDto';
import { PriceService } from './price/price.service';


@Controller('product')
export class ProductController {
 constructor(
  //  private cookieService: CookieService,
   private productService: ProductService,
   private brandService: BrandService,
   private categoryService: CategoryService,
   private subcategoryService: SubcategoryService,   
   private smakService: SmakuService,
   private ratingService: RatingService,
   private priceService: PriceService
 ){}  



@Get(':id')
@ApiOkResponse({ type: ProductDto })
@ApiParam({ name: 'id', description: 'ID of the user', example: 1 })
async productId(@Param('id', ParseIntPipe) id: number ) {  
    try {
      const product = await this.productService.productId(id);
      return product ;
    } catch (error) {
      return {  error: error.message || 'Помилка при отриманні продукту за ID' };
    }
  }



@Post('create')
@ApiCreatedResponse({ type: ProductDto })
//  async productCreate(@Body() body: PostProductDto, ){
//   // @Res({passthrough: true}) res: Response
//   // 'res',res
//   console.log('body',body, )
//  }
async productCreate(@Body() body: PostProductDto) {
    try {
      const createdProduct = await this.productService.createProduct(body);
      return { success: true, data: createdProduct };
    } catch (error) {
      return { success: false, error: error.message || 'Помилка при створенні продукту' };
    }
  }

 @Post('create-price')
 @ApiCreatedResponse({ type:  AttributesDto })
 async priceCreate(@Body() body: AttributeDto){
  return  await this.productService.productsAttribute(body)
 } 

@Get('smak/:id')
@ApiOkResponse({ type: ProductDto })
@ApiParam({ name: 'id', description: 'ID of the user', example: 1 })
async productsWithSmak(@Param('id') id: string ) {  
    try {
      const arr = id.split(',').map(Number);      
      const product = await this.productService.productsWithSmak(arr);
      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message || '<WWWWW Помилка при отримані продукту за номерам смаку' };
    }
  }

@Post('create-category')
@ApiCreatedResponse({ type: CategoryDto })
 async categoryCreate(@Body() body: PostCategoryDto, ){
 const category =  await  this.categoryService.createCategory(body)
  return category
 }

@Post('create-subcategory')
@ApiCreatedResponse({ type: SubcategoryDto })
 async subcategoryCreate(@Body() body: PostSubcategoryDto, ){
 const category =  await  this.subcategoryService.createSubcategory(body)
  return category
 }

@Post('create-brand')
@ApiCreatedResponse({ type: BrandDto })
 async brandCreate(@Body() body: PostBrandDto){
 const brand =  await  this.brandService.createBrand(body)
  return brand
 }


@Post('create-smak')
 @ApiCreatedResponse({ type: SmaksDto })
 async smakCreate(@Body() body: PostSmaksDto):Promise<SmaksDto>{
  return  await this.smakService.createSmak(body.name)

 }


 @Post('get-smak')
 @ApiCreatedResponse({ type: SmaksDto })
 async getSmaks():Promise<SmaksDto[]> {
  return  await this.smakService.getSmaks()

 }


 @Patch('patch-smak')
 @ApiCreatedResponse({ type: SmaksDto })
 async smackUpdate(@Body() body: PatchSmakDto):Promise<SmaksDto>{
  return  await this.smakService.updateSmak(body.id, body.newName)

 }

 @Post('create-rating')
 @ApiCreatedResponse({ type: RatingDto })
 async ratingCreate(@Body() body: PostRatingDto):Promise<RatingDto>{
  return  await this.ratingService.createRating(body.value, body.productId, body.userId)

 }
 
}
