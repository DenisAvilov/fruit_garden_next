import { ApiProperty } from "@nestjs/swagger";


export class PostBrandDto { 
  @ApiProperty({example: 'Зефірна магія'})
  name: string;
}
