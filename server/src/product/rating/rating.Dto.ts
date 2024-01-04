import { ApiProperty } from "@nestjs/swagger";

export class RatingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  productId: number | null;

  @ApiProperty()
  userId: number ;
 
}