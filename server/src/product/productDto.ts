import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber,  IsOptional, IsString } from "class-validator";
import { PriceDto, ProductAttributeDto, SizeProductDto, WeightDto } from "./productAttributeDto";
import { CommentDto } from "./comment/commentDto";
// import {     TotalRatingDto,  } from "./rating/ratingDto";

class Additional {  
  @ApiProperty({description: 'Назва додаткового поля'})  
  @IsString()
  name?: string | null;

  @ApiProperty({description: 'Опис додаткового поля'}) 
  @IsString()
  description?: string  | null;
}

export class ProductDto {

  @ApiProperty({ description: 'Номер продукту.' })
  @IsNotEmpty()
  @IsNumber()
  id: number; 

  @ApiProperty({ description: 'Назва продукту.' })
  @IsNotEmpty()
  @IsString()
  name: string; 

  @ApiProperty({description: 'Дата закінчення ціни продукту'})
  @IsOptional()  
  @IsString() 
  expirationDate: string | null

  @ApiProperty({description: 'Загальний опис продукту.'})
  @IsNotEmpty()
  @IsString()
  description: string;  

  @ApiProperty({description: 'Статус наявності продукту.'})
  @IsOptional()
  @IsString()
  status?: string | null  

  @ApiProperty({description: 'Зображення продукту.'})
  @IsArray()
  @IsString()
  img: string[];

  @ApiProperty({description: 'Кількість продукту на складі.'})
  @IsOptional()
  @IsNumber()
  quantity?: number | null

  @ApiProperty({description: 'Інформація щодо логістики продукту.'})
  @IsOptional()
  @IsString()
  shippingInfo?: string | null
   
  @ApiProperty({description: 'Статус доставки продукту.'})
  @IsOptional()
  @IsString()
  logisticDetails?: string | null // видалити

  @ApiProperty({description: 'Індентифікатор категорії продукту.'})
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({description: 'Індентифікатор підкатегорії продукту.'})
  @IsOptional()
  @IsNumber()
  subcategoryId?: number | null

  @ApiProperty({description: 'Індентифікатор бренду продукту.'})
  @IsOptional()
  @IsNumber()
  brandId?: number | null

  @ApiProperty({description: 'Склад продукту.'})  
  @IsString()
  ingredients: string

  @ApiProperty({type: CommentDto, description: 'Коментарі користувачів щодо продукту.'})
  @IsOptional()
  @IsArray()  
  comments?: CommentDto[];

  @ApiProperty({
    description: 'Опис парамертів ціни, ваги та пакування.',
    type: [ProductAttributeDto]
    })  
  ProductAttribute: ({
    Weight: WeightDto[];
    Price: PriceDto[];
    SizeProduct: SizeProductDto | null;
  })[];


  @ApiProperty({example: [{name: null, description: null}] })   
  additional?: Additional[];   

  @ApiProperty({description: 'Кількість всіх хто поставив бал више 4 за продукт.'})
  @IsOptional()
  @IsNumber()
  goodVotes: number

  @ApiProperty({description: 'Загальна кількість проголосувавших.'})
  @IsOptional()
  @IsNumber()
  totalVotes: number

  @ApiProperty({description: 'Середній бал рейтингу продукта.'})
  @IsOptional()
  @IsNumber()
  totalRating: number
 
}

export class DeletePriceDto{
  @ApiProperty({ description: 'Product ID', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Array of IDs', example: [2,3] })
  id: string[];
}






