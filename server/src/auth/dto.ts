import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, Length } from "class-validator"


export class SingUpBodyDto{
 @ApiProperty({
  example: 'email@gmail.com'
 })
 @IsEmail({},{ message: 'Введіть дійсну електронну адресу' })
  email: string

   @ApiProperty({
  example: '1234'
 })
 @IsNotEmpty({message: 'Всі поля повині бути заполнені'})
  @Length(4, 20, { message: 'Пароль повинен містити від 4 до 20 символів' })
  password: string
}



export class SingInBodyDto{
 @ApiProperty({
  example: 'email@gmail.com'
 })
 @IsEmail()
  email: string

   @ApiProperty({
  example: '1234'
 })
 @IsNotEmpty()
 @Length(4, 20, { message: 'Пароль повинен містити від 4 до 20 символів' })
  password: string
}

export class GetSessionInfoDto{
  @ApiProperty()
  userId: number

  @ApiProperty()
  email: string 

  @ApiProperty()
  isActivated: boolean

  @ApiProperty()
  role: string

  @ApiProperty()
  iat: number
  
  @ApiProperty()
  exp: number

  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string
}