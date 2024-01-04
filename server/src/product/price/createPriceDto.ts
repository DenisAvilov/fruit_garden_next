
import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive() 
  // @ApiProperty({
  //   description: 'Список цін для продукту',
  //   example: [
  //     { id: 1, price: 100 },
  //     { id: 2, price: 150 },
  //   ],
  // })
  @ApiProperty()
  prices: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  packageSizeId: number;
}