import { ApiProperty } from "@nestjs/swagger"

export class PatchSmakDto{
  @ApiProperty({
    description: 'Id смаку який потрібно обновити',
    example: 1})
  
  id: number

  @ApiProperty({
    description: 'Перелік смаків які потрібно змінити',
    example: 'Вішня, Лемон, Груша'})
  newName: string 

  @ApiProperty({
    description: 'Id продукту до якого потрібно додати цей смак',
    example: 1})
  newProductId: number | null
}