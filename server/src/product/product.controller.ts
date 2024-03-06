import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards,  } from '@nestjs/common';
import { DeletePriceDto, ProductDto } from './productDto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AttributeDto, PatchAttributeDto, PostProductDto} from './postProductDto';
import { ProductService } from './product.service';
import { BrandService } from './brand/brand.service';
import { BrandDto, PatchBrandDto, PostBrandDto } from './brand/branDto';
import { CategoryService } from './category/category.service';
import { CategoryDto } from './category/categoryDto';
import { CreateCategoryDto, PostCategoryDto } from './category/postCategoryDto';
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
import { LimitPages } from 'src/helpers/helpers';
import { DbService } from 'src/db/db.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Public } from 'src/auth/pablic.decorator';
import { CommentDto, PatchCommentDto, PostCommentDto, PostSubCommentDto } from './comment/commentDto';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { CommentService } from './comment/comment.service';
import { GetSessionInfoDto } from 'src/auth/dto';



export class SmaksResponseDto {
  smaks: string;
}

@ApiTags('product')
@Controller('product')
@UseGuards(AuthGuard) 
export class ProductController {
 constructor(  
   private dbService: DbService,
   private productService: ProductService,
   private brandService: BrandService,
   private categoryService: CategoryService,
   private subcategoryService: SubcategoryService,   
   private smakService: SmakuService,
   private ratingService: RatingService,
   private commentService: CommentService  
 ){}  


@Get('get-brand')
@Public()
@ApiOkResponse({description: 'Назва бренду'})
 async brandGet():Promise<BrandDto[]>{ 
 return   await  this.brandService.getBrand()  
 }

@Get('get-category')
@Public()
@ApiOkResponse({ type: CategoryDto })
 async categoryGet(){
 return await  this.categoryService.getCategory()  
 }

@Get('get-subcategory')
@Public()
@ApiOkResponse({ type: SubcategoryDto })
 async subcategoryGet(){
 return await  this.subcategoryService.getSubcategory()  
 }

@Get('smaks')
@Public()
@ApiOkResponse({type: SmaksDto, description: 'Отримуємо всі смаки'})  
 async getSmaks():Promise<SmaksDto[]>{
  return await this.smakService.getSmaks()
 }
// Product Start
@Get('/:id')
@Public()
@ApiOkResponse({ type: ProductDto, description: 'Отримуємо продукт по ID.' })
@ApiParam({ name: 'id', description: 'Отримати один продукт по его ID', example: 1 })
async productId(@Param('id', ParseIntPipe) id: number ) {  
    try {      
       return await this.productService.productId(id) 
          } catch (error) {
      throw new BadRequestException(error.message ||'Помилка при отриманні продукту по ID')  
    }
}

@Get('/:limit/:page')
@Public()
@ApiOkResponse({
    type: ProductDto,
    description: 'Отримуємо всі продукти.'
  })
@ApiQuery({ name: 'limit', required: false })
@ApiQuery({ name: 'page', required: false })
async getAllProduct( 
  @Query('limit') limit: number | string = '3', 
  @Query('page') page: number | string = '1' 
) { 
  const parsedLimits = parseInt(limit.toString(), 10)
  const parsedPage = parseInt(page.toString(), 10)
    
 const { limit: parsedLimit, offset } = await LimitPages.limitPage(parsedLimits, parsedPage);
  const products = await this.dbService.product.findMany({
    take: parsedLimit,
    skip: offset,
    include: {
      ProductAttribute: {
        include: {
          Weight: true,
          Price: true,
          SizeProduct: true
        }
      },
      additional: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  return products;
}

@Post('create')
@Roles('ADMIN')
@ApiCreatedResponse({ description: 'Продукт був успішно створен.', type: ProductDto })
async productCreate(@Body() body: PostProductDto):Promise<ProductDto> {
    try {
      return await this.productService.createProduct(body)     
    } catch (error) {
      throw new BadRequestException(error.message ||'Помилка при створенні продукту')  
    }
}

@Patch('patch')
@Roles('ADMIN')
@ApiOkResponse({ type: ProductDto, description: 'Отримуємо оновлений продукт ID.' })
async productPatch(@Body() body:PostProductDto){ 
    try {
      return  await this.productService.productPatch(body)         
    } catch (error) {
      throw new BadRequestException(error.message ||'Помилка при оновлені продукту по ID')  
    }
}

@Delete('addition/:id')
@Roles('ADMIN') 
async additionDelete(@Param('id', ParseIntPipe) id: number) { 
  try {          
      return await this.productService.deleteAdditionalRecord(id)  
  } catch (error) {
    throw new BadRequestException(error.message || 'Помилка при видаленні продукту');
  }
}

@Delete(':id')
@Roles('ADMIN')
async productDelete(@Param('id', ParseIntPipe) id: number) { 
  try {          
      await this.productService.deleteProduct(id);
      return { message: 'Продукт був успішно видалений' };
   
  } catch (error) {
    throw new BadRequestException(error.message || 'Помилка при видаленні продукту');
  }
}
// Product End
@Post('create-price')
@Roles('ADMIN')
 @ApiOkResponse({ type:  AttributeDto , description: 'Створення опису ваги.'})
 async priceCreate(@Body() body: PatchAttributeDto){
  return  await this.productService.productsAttributeCreatePrice(body)
 } 

@Patch('patch-price')
@Roles('ADMIN')
@ApiOkResponse({ type:  AttributeDto , description: 'Оновлення опису ваги.'})
async pricePatch(@Body() body: PatchAttributeDto){
  return  await this.productService.productsAttributePatchPrice(body)
 } 

@Delete('delete-price/:id')
@Roles('ADMIN')
@ApiOkResponse({ type:  AttributeDto , description: 'Id price'})
async priceDelete(@Body() body: DeletePriceDto){
  return  await this.productService.productsAttributePriceDelete(body)
 }

//Category Start
@Post('create-category')
@Roles('ADMIN')
@ApiCreatedResponse({ type: CategoryDto })
async categoryCreate(@Body() body: CreateCategoryDto, ){
 return await  this.categoryService.createCategory(body)  
 }

@Patch('patch-category')
@Roles('ADMIN')
@ApiOkResponse({ type: CategoryDto })
 async categoryPatch(@Body() body: PostCategoryDto, ){
 return  await  this.categoryService.patchCategory(body)   
 }

@Delete('delete-category/:id')
@Roles('ADMIN')
@ApiParam({ name: 'id', description: 'Видалення одинієї категорії по его ID', example: 1 })
 async categoryDelete(@Param('id', ParseIntPipe) id: number){ 
 return  await  this.categoryService.deleteCategory(id)   
 }

//Category End
@Post('create-subcategory')
@Roles('ADMIN')
@ApiCreatedResponse({ type: SubcategoryDto })
 async subcategoryCreate(@Body() body: PostSubcategoryDto, ){
   return await  this.subcategoryService.createSubcategory(body)  
 }

@Patch('patch-subcategory')
@Roles('ADMIN')
@ApiOkResponse({ type: SubcategoryDto })
 async subcategoryPatch(@Body() body: PostSubcategoryDto, ){
 return await  this.subcategoryService.patchSubcategory(body)  
 }

@Delete('delete-subcategory/:id')
@Roles('ADMIN')
@ApiParam({ name: 'id', description: 'Видалення одинієї підкатегорії по его ID', example: 1 })
 async subcategoryDelete(@Param('id', ParseIntPipe) id: number ){
 return await  this.subcategoryService.deleteSubcategory(id)  
 }
// Brand Start
@Post('create-brand')
@Roles('ADMIN')
@ApiCreatedResponse({ type: BrandDto })
 async brandCreate(@Body() body: PostBrandDto){
 return await  this.brandService.createBrand(body)  
 }

@Patch('patch-brand')
@Roles('ADMIN')
@ApiOkResponse({ type: BrandDto })
 async patchBrand(@Body() body: PatchBrandDto){
 return await  this.brandService.patchBrand(body)  
 }

@Delete('delete-brand/:id')
@Roles('ADMIN')
@ApiParam({ name: 'id', description: 'Видалення бренду по его ID', example: 1 })
 async deleteBrand(@Param('id', ParseIntPipe) id: number){
 return await  this.brandService.deleteBrand(id)  
 }
// Brand End

// Smaks Start
@Post('create-smak')
@Roles('ADMIN')
@ApiCreatedResponse({ type: SmaksDto, description: 'Створюємо смаки продуктів' })
 async smakCreate(@Body() body: PostSmaksDto):Promise<SmaksDto>{
  return  await this.smakService.createSmak(body.name)
 }

@Get('smak/:id')
@Public()
@ApiOkResponse({ type: ProductDto })
@ApiParam({ 
 name: 'id',
 description: 'Отримуємо продукт або продукти за номером смаку.',
 example: '1,2'
 })
async productsWithSmak(@Param('id') id: string ) {  
    try {
      const arr = id.split(',').map(Number)     
      const product = await this.productService.productsWithSmak(arr);
      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message || '<WWWWW Помилка при отримані продукту за номерам смаку' };
    }
  }

@Patch('patch-smak')
@Roles('ADMIN')
@ApiCreatedResponse({ type: SmaksDto })
async smackUpdate(@Body() body: PatchSmakDto):Promise<SmaksDto>{
  return  await this.smakService.updateSmak(body.id, body.newName)
}
// Smaks End
// Rating START
@Post('create-rating')
@Public()
@ApiCreatedResponse({ type: RatingDto })
async ratingCreate(@Body() body: PostRatingDto):Promise<RatingDto>{
  return  await this.ratingService.createRating(body.value, body.productId, body.userId)
 }
 
@Post('create-comment')
@Roles('ADMIN','USER')
@ApiCreatedResponse({ type: CommentDto })
async comment(@SessionInfo() session: GetSessionInfoDto,@Body() body: PostCommentDto){
return await this.commentService.createComment(session, body) 
}

@Patch('patch-comment')
@Roles('ADMIN','USER')
@ApiOkResponse({ type: CommentDto })
async patchComment(@Body() body:  PatchCommentDto,
@SessionInfo() session: GetSessionInfoDto){
return await this.commentService.patchComment(session, body)
}

@Delete('delete-comment/:id')
@Roles('ADMIN','USER')
@ApiParam({ name: 'id', description: 'Видалити коментарій по его ID', example: 1 })
async deleteComment(
@Param('id', ParseIntPipe) id: number, 
@SessionInfo() session: GetSessionInfoDto
){ 
 return await this.commentService.deleteComment(session, id) 
}
//Sub Comment 
@Post('create-sub-comment')
@Roles('ADMIN','USER')
@ApiCreatedResponse({ type: CommentDto })
async subComment(@SessionInfo() session: GetSessionInfoDto,@Body() body: PostSubCommentDto){
return await this.commentService.createSubComment(session, body)
}
}


