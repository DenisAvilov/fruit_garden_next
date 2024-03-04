import { Role } from "@prisma/client"
import { BasketDto, OrderItemsDto } from "src/basket/basketDto"
import { ApiProperty } from "@nestjs/swagger"
import { ContactDto } from "src/account/dto"


export class UserDTO{
  
  userId: number

  email : string
  @ApiProperty({ enum: Role, description: 'Ідентифікатор користувача' })
  role: Role
  isActivated: boolean  
  activationLink: string  
  basket?:  BasketDto
  orders?: OrderItemsDto
   @ApiProperty({ type: ContactDto, description: 'Контактний номер' })
  contact?: ContactDto
    constructor(
      model:{
      id: number,
      email: string, 
      isActivated: boolean, 
      role: Role,
      activationLink: string,
      basket?:  BasketDto
      orders?: OrderItemsDto  
    }){
    this.userId = model.id
    this.email = model.email
    this.isActivated = model.isActivated 
    this.activationLink = model.activationLink  
    this.role = model.role
    this.basket = model.basket;
    this.orders = model.orders;
  }
}