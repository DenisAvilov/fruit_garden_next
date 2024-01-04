import { ApiProperty } from "@nestjs/swagger";

export class PostCategoryDto {

  @ApiProperty({example: 'foto-category'})
  img: string;

  @ApiProperty({example: 'Зефір'})
  name: string;
  
 
}