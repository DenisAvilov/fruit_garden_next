import { ApiProperty } from "@nestjs/swagger";

export class BrandDto {
  @ApiProperty({description: 'Id brand'})
  id: number;

  @ApiProperty({description: 'Назва бренда'})
  name: string;  
 
}

export class PostBrandDto { 
  @ApiProperty({example: 'Зефірна магія', description: 'Створення нового бренду'})
  name: string;
}

export class PatchBrandDto {
  @ApiProperty({example: 1})
  id: number;

  @ApiProperty({example: 'Оновлення бренду', description: 'Переіменування бренду'})
  name: string;   
}
