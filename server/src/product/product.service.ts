import {  Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import {  AttributeDto, PostProductDto } from './postProductDto';



@Injectable()
export class ProductService {
  constructor(
  private  db: DbService
  ){}
 async createProduct(productDto: PostProductDto) {
  
    try {
       const existingCategory = await this.db.category.findUnique({
       where: { id: productDto.categoryId },
      });

      if (!existingCategory) {      
       return { success: false, message: 'Категорія не знайдена. Спочатку створіть категорію.' };
    }       
      const productData: any = {
      name: productDto.name,
      img: productDto.img,
      description: productDto.description,  
      ingredients: productDto.ingredients,          
      category: { connect: { id: productDto.categoryId } }, 
      smaksId: { set: productDto.smaksId },    
      // smaks:{ select: { name: true }},     
      //  additional: productDto.additional
    }    
    if (productDto.additional) {
      const additionalData = Array.isArray(productDto.additional)
    ? productDto.additional.map((a) => ({ name: a.name, description: a.description }))
    : [{ name: productDto.additional.name, description: productDto.additional.description }];

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
    const weightData = productDto.attribute.weight.map((w, index) => ({ weight: [w], unic: [productDto.attribute.unic[index]] }));
    
    const productAttributes = await this.db.productAttribute.create({
      data: {
        productId: product.id, 
        Weight: {                     
          create: weightData            
        },
        Price: {
          create: productDto.attribute.price.map((p) => ({ price: [p], startDate: productDto.attribute.startDate, endDate: productDto.attribute.endDate })),
        },
        SizeProduct: {
          create: {
            size: productDto.attribute.size,
          },
        },
        
      },
    });
    return {productData, productAttributes};
    } catch (error) {      
      throw new Error(`Помилка при створенні продукту ${error.message}  ${error}`, );
    }
  }
 

  async productId(id: number){    
    return  await this.db.product.findFirstOrThrow({
      where: {id},
      include: { 
        smaks: true,
        ProductAttribute: {
        include: {
          Weight: true,
          Price: true,
          SizeProduct: true,          
        },       
      },
       additional: true
      },
    })       
  }


async productsAttribute(attribute: AttributeDto){
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
      const weightData = attribute.weight.map((w, index) => ({ weight: [w], unic: [attribute.unic[index]] }));
      
      const createdProductAttribute = await this.db.productAttribute.create({
        data: {
          productId: attribute.productId, // 1
          Weight: {                     
            create: weightData            
          },
          Price: {
            create: attribute.price.map((p) => ({ price: [p], startDate: attribute.startDate, endDate: attribute.endDate })),
          },
          SizeProduct: {
            create: {
              size: attribute.size,
            },
          },
          
        },
      });

      return createdProductAttribute
    } catch (error) {      
      throw new Error(`Error creating product attribute:  ${error.message}`);     
    }
}

async productsWithSmak(smackId: number[]){    
    const productsWithSmak = await this.db.product.findMany({
     where: {
     smaksId: {
      hasSome: smackId,
    },
  },
    });     
    return { success: true, products: productsWithSmak};
  }
}


    
   