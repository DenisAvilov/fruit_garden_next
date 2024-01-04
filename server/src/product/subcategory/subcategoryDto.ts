import { ApiProperty } from "@nestjs/swagger";

export class SubcategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string; 

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  createdAt: string;
 
}
