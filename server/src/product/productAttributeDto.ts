import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray, IsString, IsOptional, IsDate } from "class-validator";

export class WeightDto {
  @ApiProperty({ description: 'Ідентифікатор ваги' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Маса продукту' })
  @IsArray()
  @IsNumber()
  weight: number[];

  @ApiProperty({ description: 'Одиниці виміру' })
  @IsArray()
  @IsString()
  unic: string[];

  @ApiProperty({ description: 'Ідентифікатор ваги до якого продукту відноситься' })
  @IsNumber()
  weightId: number;
}
export class PriceDto {
  @ApiProperty({ description: 'Ідентифікатор ціни' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Масив значень цін' })
  @IsArray()
  @IsNumber({}, { each: true })
  price: number[];

  @ApiProperty({ description: 'Дата початку дії ціни' })
  @IsOptional()
  @IsDate()
  startDate: Date | null;

  @ApiProperty({ description: 'Дата завершення дії ціни' })
  @IsOptional()
  @IsDate()
  endDate: Date | null;

  @ApiProperty({ description: 'Ідентифікатор ціни' })
  @IsNumber()
  priceId: number;
}
export class SizeProductDto {
  @ApiProperty({description: 'Ідентифікатор розміру продукту' })
  @IsNumber()
  id: number;

  @ApiProperty({description: 'Розмір продукту' })
  @IsArray()
  @IsString({ each: true })
  size: string[];

  @ApiProperty({description: 'Ідентифікатор розміру продукту' })
  @IsNumber()
  sizeId: number;
}
export class ProductAttributeDto {
  @ApiProperty({ description: 'Індефікатор Attribute.' })  
  id: number
  @ApiProperty({ description: 'Індефікатор продукту.' })   
  productId: number

  @ApiProperty({type: WeightDto, description: 'Вага продукту'}) 
  Weight: WeightDto[]

  @ApiProperty({ type: [PriceDto], description: 'Цінові атрибути'})
  @IsArray()   
  Price: PriceDto[];  

  @ApiProperty({
    type: SizeProductDto,
    description: 'Інформація про розмір продукту або null, якщо немає розміру'
  })
  @IsOptional()
  sizeProduct: SizeProductDto | null;    
}


//PatchProductAttributeDto


export class PatchWeightDto {
  @ApiProperty({ description: 'Ідентифікатор ваги' })
  @IsNumber()
  id: number;

  @ApiProperty({example: [500], description: 'Маса продукту' })
  @IsArray()
  @IsNumber()
  weight: number[];

  @ApiProperty({example: ['гр.'], description: 'Одиниці виміру' })
  @IsArray()
  @IsString()
  unic: string[];

  @ApiProperty({ description: 'Ідентифікатор ваги до якого продукту відноситься' })
  @IsNumber()
  weightId: number;
}
export class PatchPriceDto {
  @ApiProperty({ description: 'Ідентифікатор ціни' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Масив значень цін' })
  @IsArray()
  @IsNumber({}, { each: true })
  price: number[];

  @ApiProperty({ description: 'Дата початку дії ціни' })
  @IsOptional()
  @IsDate()
  startDate: Date | null;

  @ApiProperty({ description: 'Дата завершення дії ціни' })
  @IsOptional()
  @IsDate()
  endDate: Date | null;

  @ApiProperty({ description: 'Ідентифікатор ціни' })
  @IsNumber()
  priceId: number;
}
export class PatchSizeProductDto {
  @ApiProperty({ example: 1, description: 'Ідентифікатор розміру продукту' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: ['Small'], description: 'Розмір продукту' })
  @IsArray()
  @IsString({ each: true })
  size: string[];

  @ApiProperty({ example: 123, description: 'Ідентифікатор розміру продукту' })
  @IsNumber()
  sizeId: number;
}
export class PatchProductAttributeDto {
  @ApiProperty({ description: 'Індефікатор Attribute.' })  
  id: number
  @ApiProperty({ description: 'Індефікатор продукту.' })   
  productId: number

  @ApiProperty({type: PatchWeightDto, description: 'Вага продукту'}) 
  Weight: PatchWeightDto[]

  @ApiProperty({ type: [PatchPriceDto], description: 'Цінові атрибути'})
  @IsArray()   
  Price: PatchPriceDto[];  

  @ApiProperty({
    type: PatchSizeProductDto,
    description: 'Інформація про розмір продукту або null, якщо немає розміру'
  })
  @IsOptional()
  sizeProduct: PatchSizeProductDto | null;    
}