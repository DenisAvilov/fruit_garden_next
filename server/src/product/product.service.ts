import {  BadRequestException, HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {  AttributeDto,    PostProductDto } from './postProductDto';
import { DeletePriceDto, ProductDto, } from './productDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentService } from './comment/comment.service';
import { RatingService } from './rating/rating.service';
// import { ProductForSmakDto } from './smaku/smakuDto';




@Injectable()
@UseGuards(AuthGuard) 
export class ProductService {
  constructor(
  private  db: DbService,
  private ratingService: RatingService,
  private commentService: CommentService
  ){}

private async createProductAttributes(attribute: AttributeDto) {
    const weightData = attribute.weight.map((w, index) => ({ weight: [w], unic: [attribute.unic[index]] }));
    
    const createdProductAttribute = await this.db.productAttribute.create({
      data: {
        productId: attribute.productId,
        Weight: { create: weightData },
        Price: { create: attribute.price.map((p) => ({ price: [p], startDate: attribute.startDate, endDate: attribute.endDate })) },
        SizeProduct: { create: { size: attribute.size } },
      },
    });

    return createdProductAttribute;
}

async createProduct(productDto: PostProductDto):Promise<ProductDto> { 
    try {
       const existingCategory = await this.db.category.findUnique({
       where: { id: productDto.categoryId },
      });

      if (!existingCategory) {     
          throw new BadRequestException({code: 400, message: 'Категорія не знайдена. Спочатку створіть категорію.'});       
    }       
      const productData: any = {
      name: productDto.name,
      img: productDto.img,
      description: productDto.description,  
      ingredients: productDto.ingredients,          
      category: { connect: { id: productDto.categoryId } }, 
      smaksId: { set: productDto.smaksId },      
    }   
    if (productDto.additional && productDto.additional.length > 0) {
      const additionalData = productDto.additional.map((a) => ({ name: a?.name || null, description: a?.description || null }));
      productData.additional = { create: additionalData };

      
    }
    if (productDto.subcategoryId) {
      productData.subcategory = { connect: { id: productDto.subcategoryId } };
    }
    if (productDto.brandId) {
      productData.brand = { connect: {id: productDto.brandId}}
    }      
    if(productDto.quantity){
      productData.quantity =  productDto.quantity
    }       
    if(productDto.expirationDate){
      productData.expirationDate = productDto.expirationDate
    }
    if(productDto.status){
      productData.status = productDto.status
    }
    if(productDto.shippingInfo){
      productData.shippingInfo = productDto.shippingInfo
    }
    if(productDto.logisticDetails){
      productData.logisticDetails = productDto.logisticDetails
    }     
    const product = await this.db.product.create({
      data: productData,      
    });    
    if (!product) {
      
        throw new Error('Product not found');
      }
    const weightData = productDto.productAttribute.Weight.weight.map((w, index) => ({ weight: [w], unic: [productDto.productAttribute.Weight.unic[index]] }));
    
     await this.db.productAttribute.create({
      data: {
        productId: product.id, 
        Weight: {                     
          create: weightData            
        },
        Price: {
          create: productDto.productAttribute.Price.price.map((p) => ({ price: [p], startDate: productDto.productAttribute.Price.startDate, endDate: productDto.productAttribute.Price.endDate })),
        },
        SizeProduct: {
          create: {
            size: productDto.productAttribute.SizeProduct.size,
          },
        },
        
      },
    });
    return productData;
    } catch (error) {      
      throw new HttpException(`Помилка при створенні продукту ${error.message} ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

async productId(id: number):Promise<ProductDto>  {      
   try{    
  const product = await this.db.product.findFirstOrThrow({
          where: {id},
          include: {        
            ProductAttribute: {
            include: {
              Weight: true,
              Price: true,
              SizeProduct: true,          
            },       
          },          
          additional: true,
          comments: true,                                         
          },
        }) 
  return product
      }
    catch (error) {
       throw new Error(`Error get product by Id:  ${error.message}`); 
 }
}

async productPatch(body: PostProductDto){    
 try {  
  const product = await this.db.product.update({
  where: { id: body.id },
  data: {
    name: body.name,
    img: body.img,
    description: body.description,  
    ingredients: body.ingredients,     
    category: body.categoryId ? { connect: { id: body.categoryId } } : undefined,
    smaksId: body.smaksId ? { set: body.smaksId } : undefined,
  additional: body.additional ? {
    update: body.additional
      .filter(a => a.id) // Відфільтруйте записи, які мають ідентифікатор
      .map((a) => ({
        where: { id: a.id }, // Оновити за ідентифікатором
        data: { name: a.name, description: a.description }
      })),
    create: body.additional
      .filter(a => !a.id) // Відфільтруйте записи без ідентифікатора
      .map((a) => ({ name: a.name || null, description: a.description || null }))
} : undefined,

    subcategory: body.subcategoryId ? { connect: { id: body.subcategoryId } } : undefined,
    brand: body.brandId ? { connect: { id: body.brandId } } : undefined,     
    quantity: body.quantity,
    expirationDate: body.expirationDate,
    status: body.status ? { set: body.status } : undefined,
    shippingInfo: body.shippingInfo,
    logisticDetails: body.logisticDetails,
    
  }
});

  return product;
} catch (error) {
  throw new HttpException(`Помилка при оновленні продукту: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
}
}

async deleteAdditionalRecord(id: number){
  try{
       
  //Пошук запису Additional за його ідентифікатором та ідентифікатором продукту
    const additional = await this.db.additional.findFirst({ 
      where: { 
        AND: [
          { id: id },          
        ] 
      } 
    });
    
    // Перевірка, чи знайдено запис Additional
    if (!additional) {
      throw new Error(`Additional record with ID ${id}.`);
    }
    
    // Видалення запису Additional
    const deletedAdditional = await this.db.additional.delete({ where: { id: id } });
    
    return deletedAdditional;
  }
  catch(error){
     throw new Error(`Error delete product or addition:  ${error.message}`);   
  }
}

async deleteProduct(productId: number) {
  try {   
     
    await this.db.productAttribute.findMany({ where: { productId: productId } });
    
    await this.db.productAttribute.deleteMany({ where: { productId: productId } });
   
    const product = await this.db.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }
   
    const deletedProduct = await this.db.product.delete({ where: { id: productId } });

    return deletedProduct;
  } catch (error) {
    throw new Error(`Error deleting product with dependencies: ${error.message}`);
  }
}
//END ALL PRODUCT
async productsAttributeCreatePrice(attribute: AttributeDto){
      try {
      // Знайдемо продукт за його ідентифікатором
      const product = await this.db.product.findUnique({
        where: {
          id: attribute.productId,
        },
      });

      if (!product) {
        throw new Error('Product not found');
      }
      return  await this.createProductAttributes(attribute);      
    } catch (error) {      
      throw new Error(`Error creating product attribute:  ${error.message}`);     
    }
}

async productsAttributePatchPrice(attribute: AttributeDto):Promise<{id: number, productId: number}>{
      try {     
      const product = await this.db.product.findUnique({
        where: {
          id: attribute.productId,
        },
      });

      if (!product) {
        throw new Error('Product not found');
      }
      const existingProductAttribute = await this.db.productAttribute.findFirst({
        where: {
          id: { in: attribute.id },
          productId: attribute.productId,
        },
         include: {
         Weight: true,
      },
      });

      if (!existingProductAttribute) {
        throw new Error('Product attribute not found');
      }

      const weightData = attribute.weight.map((w, index) => ({ where: { id: existingProductAttribute.Weight[index].id }, data: { weight: [w], unic: [attribute.unic[index]] } }));
      
      if (!attribute.id || attribute.id.length === 0) {
      throw new BadRequestException('Id array must not be empty');
      }
      const updatedProductAttribute = await this.db.productAttribute.update({
        where: { id: existingProductAttribute.id },
        data: {
          Weight: { updateMany: weightData },
          Price: { update: attribute.price.map((p, index) => ({ where: { id: attribute.id![index] }, data: { price: [p], startDate: attribute.startDate, endDate: attribute.endDate } })) },
          SizeProduct: { update: { size: attribute.size } },
        },
      });

      return updatedProductAttribute;
    } catch (error) {      
      throw new Error(`Error creating product attribute:  ${error.message}`);     
    }
}

async productsWithSmak(smackId: number[]) {  
 const productsWithSmak = await this.db.product.findMany({
     where: {
     smaksId: {
      hasSome: smackId,
    },
  },
    });     
    return  productsWithSmak;
}

async productsAttributePriceDelete(price: DeletePriceDto){
      try {      
      const product = await this.db.product.findUnique({
        where: {
          id: price.productId,
        },
      });

      if (!product) {
        throw new Error('Product not found');
      }
    const numericIds = price.id.map(Number);     
    await this.db.productAttribute.deleteMany({
      where: {
          productId: price.productId,
    Weight: { some: { id: { in: numericIds } } },
    Price: { some: { id: { in: numericIds } } },    
      },
    });
      
    } catch (error) {      
      throw new Error(`Error creating product attribute:  ${error.message}`);     
    }
}   

}