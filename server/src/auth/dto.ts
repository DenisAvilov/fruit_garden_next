import { ApiProperty } from "@nestjs/swagger"

export class SingUpBodyDto{
 @ApiProperty({
  example: 'email@gmail.com'
 })
  email: string

   @ApiProperty({
  example: '1234'
 })
  password: string
}

export class SingInBodyDto{
 @ApiProperty({
  example: 'email@gmail.com'
 })
  email: string

   @ApiProperty({
  example: '1234'
 })
  password: string
}

export class GetSessionInfoDto{
  @ApiProperty()
  id: number

  @ApiProperty()
  email: string 

  @ApiProperty()
  iat: number
  
  @ApiProperty()
  exp: number
}