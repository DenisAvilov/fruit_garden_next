import { ApiProperty } from "@nestjs/swagger";

export class PostRatingDto {

  @ApiProperty({example: 1})
  value: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  userId: number; 
}