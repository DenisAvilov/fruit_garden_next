
import { ApiProperty } from "@nestjs/swagger"

// import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsDateString, IsObject } from "class-validator";

export class  AttributeDto {

  //Weight
  @ApiProperty({example: 1})
  @IsNumber()
  productId: number

  @ApiProperty()
  @IsArray()  
  weight: number[];

  @ApiProperty()
  @IsArray()
  unic: string[]


  //Price
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  price: number[];

  @ApiProperty()
  // @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty()
  // @ApiProperty()
  @IsOptional()
  @IsDateString()
  endDate?: string;

  //Size
  @ApiProperty()  
  @IsString()  
  size: string[];
}

export class  AttributesDto {

  @ApiProperty()
  @IsNumber()
  productId: number

  @ApiProperty()
  @IsArray()
  @IsNumber()
  weight: number[];

  @ApiProperty()
  @IsString()
  unic: string

  @ApiProperty()
  @IsArray()
  @IsNumber()
  price: number[];

  @ApiProperty()
  @IsString()
  currency?: string;

  @ApiProperty()
  @IsArray()  
  size: string[];

  @ApiProperty()
  @IsOptional()
  // @IsDateString()
  startDate?: Date;
}


export class Additional {  
  @ApiProperty({example:'Смак печево'})
  @IsString()
  name?: string

  @ApiProperty({example:'Шоколадний'})
  @IsString()
  description?: string 
}

export class PostProductDto {

  @ApiProperty({ type: Additional, isArray: true })   
  additional?: Additional | Additional[]; 

  @ApiProperty({example: 'Зефір класичний'})
  @IsNotEmpty()
  @IsString()
  name: string; 

  
  @ApiProperty({example: 'Срок придатності 20 днів від дати виготевлення.'})
  @IsOptional()  
  expirationDate?: string;

  @ApiProperty({example: 'Продукт з ниским вмісту цукру, виготовлений з природних продуктах.'})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({example: 'Під заказ'})
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: ['img1.jpg', 'img2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  img: string[];

  

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  quantity?: number;
   
  @ApiProperty({ example: [1,2], required: false })  
  @IsArray()
  smaksId: number[];

  @ApiProperty({ example: 'Express shipping available' })
  @IsOptional()
  @IsString()
  shippingInfo?: string;

  @ApiProperty({ example: 'Деталі по логістике' })
  @IsOptional()
  @IsString()
  logisticDetails?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  brandId?: number;

  @ApiProperty({ example: 'Состав продукту містить: наступне' })  
  @IsString()
  ingredients: string

  @ApiProperty({ example: ['Comment 1', 'Comment 2'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  comments?: string[];

  @ApiProperty({ example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  

  // Додавання Ціни Ваги Розміру коробки 
  @ApiProperty({
    example: {
      weight: [0.5],
      unic: ["гр."],
      price: [150],
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      size: ['Small',],     
    },
  })
  @IsObject()  
  attribute: AttributeDto;
}


