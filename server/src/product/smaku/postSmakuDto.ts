import { ApiProperty } from "@nestjs/swagger";

export class PostSmaksDto {
  @ApiProperty({example: 'Вішня, Лемон, Груша'})
  name: string;  

  
}