
import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional,  IsObject, IsDateString } from "class-validator";


export class  AttributeDto {
  @ApiProperty({type: [Number], description: 'Id array for price.'}) 
  id?: number[] 

  //Weight
  @ApiProperty({example: 1, description: 'Id продукту.'})
  @IsNumber()
  productId: number

  @ApiProperty({ type: [Number], description: 'Array of weights' })
  @IsArray()
  weight: number[];

  @ApiProperty({ type: [String], description: 'Array of units (e.g., "гр.")' })
  @IsArray()
  @IsString({ each: true })
  unic: string[];

  //Price
  @ApiProperty({description: 'Опис ціни з урохуванням коми.'})
  @IsArray()
  @IsNumber({}, { each: true })
  price: number[];

  @ApiProperty({ description: 'Start date in ISO format' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: 'End date in ISO format' })
  @IsDateString()
  endDate: string;

  //Size
  @ApiProperty({ type: [String], description: 'Array of sizes' })
  @IsArray()
  @IsString({ each: true })
  size: string[];
}

export class  PatchAttributeDto {

  @ApiProperty({example: [1], description: 'Id array a price.'})  
  id?: number[]

  //Weight
  @ApiProperty({example: 1, description: 'Id продукту.'})
  @IsNumber()
  productId: number

  @ApiProperty({ example: [500],type: [Number], description: 'Array of weights' })
  @IsArray()
  weight: number[];

  @ApiProperty({  example: ["гр."], type: [String], description: 'Array of units (e.g., "гр.")' })
  @IsArray()
  @IsString({ each: true })
  unic: string[];

  //Price
  @ApiProperty({example: [227], description: 'Опис ціни з урохуванням коми.'})
  @IsArray()
  @IsNumber({}, { each: true })
  price: number[];

  @ApiProperty({ example: new Date().toISOString(), description: 'Start date in ISO format' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: new Date().toISOString(), description: 'End date in ISO format' })
  @IsDateString()
  endDate: string;

  //Size
  @ApiProperty({  example: ["Middle"], type: [String], description: 'Array of sizes' })
  @IsArray()
  @IsString({ each: true })
  size: string[];
}

export class Additional {  
  @ApiProperty({example: 1})
  id: number
  
  @ApiProperty({example:'Смак печево'})  
  @IsString()
  name?: string | null;

  @ApiProperty({example:'Шоколадний'}) 
  @IsString()
  description?: string | null;
}

export class PostProductDto {

  @ApiProperty({example: 1})
  id: number

  @ApiProperty({
  description: 'Назва продукту.',
  example: 'Зефір класичний'})
  @IsNotEmpty()
  @IsString()
  name: string; 

  
  @ApiProperty({
  description: 'Дата закінчення ціни продукту',
  example: 'Срок придатності 20 днів від дати виготевлення.'})
  @IsOptional() 
  @IsString() 
  expirationDate: string | undefined

  @ApiProperty({
  description: 'Загальний опис продукту.', 
  example: 'Продукт з ниским вмісту цукру, виготовлений з природних продуктах.'})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
  description: 'Статус наявності продукту.',
  example: 'Під заказ'})
  @IsOptional()
  @IsString()
  status?: string | null

  @ApiProperty({
  description: 'Зображення продукту.', 
  example: ['img1.jpg', 'img2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  img: string[];  

  @ApiProperty({
  description: 'Кількість продукту на складі.',
  example: 10 }) 
  @IsNumber()
  quantity?: number | null

  @ApiProperty({
  description: 'Інформація щодо логістики продукту.',
  example: 'Способи доставки' })
  @IsOptional()
  @IsString()
  shippingInfo?: string | null

  @ApiProperty({
  description: 'Статус доставки продукту.', 
  example: 'Ваш заказ сьогодні виїхав до вас.' })
  @IsOptional()
  @IsString()
  logisticDetails?: string;  //видалити

  @ApiProperty({
  description: 'Індентифікатор категорії продукту.', 
  example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
  description: 'Індентифікатор підкатегорії продукту.', 
  example: 1 })
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

  @ApiProperty({
  description: 'Індентифікатор бренду продукту.',
  example: 1 })
  @IsOptional()
  @IsNumber()
  brandId?: number | null

  @ApiProperty({
  description: 'Склад продукту.',
  example: 'Состав продукту містить: наступне' })  
  @IsString()
  ingredients: string

  @ApiProperty({
  description: 'Коментарі користувачів щодо продукту.',
  example: ['Comment 1', 'Comment 2'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  comments?: string[];

  @ApiProperty({
  description: 'Коментарі користувачів щодо продукту.',
  example: 4.5, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
  description: 'Перелік індентифікаторів смаків продукту.',
  example: [1,2], required: false })  
  @IsArray()  
  @IsNumber({}, { each: true })
  smaksId: number[];

  @ApiProperty({
  description: 'Опис парамертів ціни, ваги та пакування .',
  example: {      
      Weight: { weight: [500], unic: ['гр.'] },
      Price: { price: [150], startDate: new Date().toISOString(), endDate: new Date().toISOString(), },
      SizeProduct: { size: ['Small'], },
    },
  })
  @IsObject()
  productAttribute: {    
    Weight: Pick<AttributeDto, 'weight' | 'unic'>;
    Price: Pick<AttributeDto, 'price' | 'startDate' | 'endDate'>;
    SizeProduct: Pick<AttributeDto, 'size'>;
  };

  @ApiProperty({example: [{name: 'Смак печево', description: 'Шоколадний'}] })   
  additional?: Additional[];
}


