import { ApiProperty } from "@nestjs/swagger";

export class PostCategoryDto {

  @ApiProperty({example: 1})
  id?: string

  @ApiProperty({example: 'foto-category'})
  img: string;

  @ApiProperty({example: 'Зефір'})
  name: string;
  
  @ApiProperty({example: 'icons category'})
  icons: string
}
export class CreateCategoryDto {

  @ApiProperty({example: 'foto-category'})
  img: string;

  @ApiProperty({example: 'Зефір'})
  name: string;

  @ApiProperty({example: 'icons category'})
  icons: string
 
}