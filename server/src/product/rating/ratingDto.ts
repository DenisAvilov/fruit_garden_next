import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNumber, IsOptional } from "class-validator";


export class RatingDto { 
  @ApiProperty({description: "Індентифікатор продукта"})
  @IsInt()
  productId: number

  @ApiProperty({description: "Передана оцінка користувача за продукт."})
  @IsInt()
  value: number
   
  @ApiProperty({description: "Середне значення. Рейтинг"}) 
  @IsOptional()
  @IsNumber()
  userId?:  number | null 
}  


export class PostAndUpdateRatingDto {
 
  @ApiProperty({example: 4, description: "Передаваемое значение"})  
  @IsNumber()
  value: number  

  @ApiProperty({example: 1, description: "Індентифікатор продкта"}) 
  @IsInt()
  productId: number 
}

export class TotalRatingDto {
  @ApiProperty({description: "Індентифікатор продукта"})
  @IsInt()
  productId: number

  @ApiProperty({description: "Лайк"})
  @IsNumber()
  goodVotes: number

  @ApiProperty({description: "Загальна кількість проголосовавших"}) 
  @IsNumber()
  totalVotes: number
  
  @ApiProperty({description: "Середній бал з загальної кількісті"}) 
  @IsNumber()
  totalRating: number

  @ApiProperty({description: "масів голосів"}) 
  @IsArray()
  ratings: RatingDto[]
  
}