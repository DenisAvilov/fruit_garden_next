import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import {  AttributeDto } from "./postProductDto";

class Additional {  
  @ApiProperty()
  @IsString()
  name?: string

  @ApiProperty()
  @IsString()
  description?: string 
}

export class ProductDto {

  @ApiProperty({ type: [Additional] })   
  additional: Additional[]

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string; 

  
  @ApiProperty()
  @IsOptional()  
  expirationDate?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsArray()
  @IsString()
  smaks: string[]

  @ApiProperty()
  @IsArray()
  @IsString()
  img: string[];

  

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  quantity?: number;
   
  @ApiProperty()  
  @IsArray()
  smaksId: number[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  shippingInfo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  logisticDetails?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  subcategoryId?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  brandId?: number;

  @ApiProperty()  
  @IsString()
  ingredients: string

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString()
  comments?: string[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rating?: number;

   
  @ApiProperty()
  @IsObject()  
  attribute: AttributeDto;
}



