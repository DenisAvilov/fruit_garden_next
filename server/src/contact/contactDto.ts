import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator";


export class ContactDto{
  @ApiProperty()
  id: number
  @ApiProperty({example: '0506195452'})
  phone: string | null

 
  @ApiProperty({ example: false })
  @IsBoolean()
  isActivated: boolean

  @ApiProperty({ example: 'http//:link' })
  activationLink: string | null

  @ApiProperty()
  userId: number
}