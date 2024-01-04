import { ApiProperty } from "@nestjs/swagger";

export class PostSubcategoryDto {

  @ApiProperty({example: 'Різдвяні набори'})
  name: string; 

  @ApiProperty()
  categoryId: number;
  
}