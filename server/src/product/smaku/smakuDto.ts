import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber,   IsString } from "class-validator";

export class SmaksDto {
  @ApiProperty({description: 'Номер смаку продукту.'})
  @IsNumber()
  id: number;

  @ApiProperty({description: 'Назва смаку продукту.'})
  @IsString()
  name: string;
  
}

export class ProductForSmakDto {
  
  @ApiProperty({ description: 'Номер продукту.' }) 
  @IsNumber()
  id: number; 


  @ApiProperty({ description: 'Номер продукту.' }) 
  @IsNumber()
  productkId: number; 

}