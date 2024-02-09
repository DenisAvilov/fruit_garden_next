import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class AdditionalDto {
  @ApiProperty({example: 1, description: 'Ідентифікатор додаткового поля для видалення' })
  @IsNumber()
  id : number | null

  @ApiProperty({example: 1, description: 'Ідентифікатор продукта з якого потрібно видалити податкове поле' })
  product : number
}