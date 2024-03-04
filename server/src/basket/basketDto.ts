import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, ValidateNested, IsArray } from "class-validator";

export class ProductAttributeInBasketDto {
  @ApiProperty({description: 'Індентифікатор характеристики продукту в корзині' })
  @IsOptional()
  id?: number

  @ApiProperty({description: 'Індентифікатор продукту в корзині' })
  @IsNumber()
  @IsOptional()
  productInBasketId?: number

  @ApiProperty({description: 'Назва продукту' })
  @IsString()
  name: string;

  @ApiProperty({description: 'Зображення продукту' })
  @IsString()
  img: string;

  @ApiProperty({description: 'Категорія' })
  @IsString()
  category: string;

  @ApiProperty({description: 'Підкатегорія' })
  @IsString()
  @IsOptional()
  subcategory?: string | null   

  @ApiProperty({description: 'Бренд' })
  @IsString()
  brand: string;

  @ApiProperty({description: 'Смак' })
  @IsString()
  smaks: string;

  @ApiProperty({description: 'Вага' })
  @IsNumber()
  weight: number;

  @ApiProperty({description: 'Одиниці виміру кг або гр' })
  @IsString()
  unic: string

  @ApiProperty({description: 'Ціна' })
  @IsNumber()
  price: number;

  @ApiProperty({description: 'Розмір' })
  @IsString()
  @IsOptional()
  size?: string | null
  
}

export class ProductInBasketDto {

  @ApiProperty({description: 'Індентифікатор продукту в корзині' })
  @IsNumber()
  id: number;

  @ApiProperty({description: 'Індентифікатор корзини, якщо він відомий.' })
  @IsNumber()
  @IsOptional()
  basketId?: number | null; 
 
  @ApiProperty({description: 'Індифікатор одного товару в корзині' })
  @IsNumber()
  productId: number; 

  @ApiProperty({description: 'Кількість товару в корзині' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: [ProductAttributeInBasketDto], description: 'Характеристики продукту в корзині' })
  @ValidateNested({ each: true })
  attributes: ProductAttributeInBasketDto[];


}

export class BasketDto { 
  @ApiProperty({description: 'Індентифікатор корзини' })
  @IsNumber()
  id: number;

  @ApiProperty({description: 'Індентифікатор корестувача якщо є.' })
  @IsNumber()
  @IsOptional()
  userId?: number | null
  
  @ApiProperty({description: 'Телефон корестувача якщо є.' })
  @IsString()
  @IsOptional()
  phoneId?: string 

  @ApiProperty({ type: String, description: 'Телефон корестувача якщо є.' })
  @IsString()
  @IsOptional()
  additionalInfo?: string | null

  @ApiProperty({ type: [ProductInBasketDto], description: 'Опис одного продукту в карзині.' })
  @IsArray()
  @ValidateNested({ each: true })
  productsInBasket: ProductInBasketDto[]
}

export class OrderItemsDto {
  @ApiProperty({description: 'Індентифікатор елемента замовлення' })
  @IsNumber()
  id: number;

  @ApiProperty({description: 'Індентифікатор замовлення' })
  @IsNumber()
  orderId: number;

  @ApiProperty({description: 'Індентифікатор продукту' })
  @IsNumber()
  productId: number;

  @ApiProperty({description: 'Кількість продукту' })
  @IsNumber()
  quantity: number;

  @ApiProperty({description: 'Ціна за одиницю товару' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({description: 'Загальна вартість продукту в замовленні' })
  @IsNumber()
  totalPrice: number;
}


export class OrdersDto {
  @ApiProperty({description: 'Індентифікатор замовлення' })
  @IsNumber()
  id: number;

  @ApiProperty({description: 'Індентифікатор користувача' })
  @IsNumber()
  userId: number;

  @ApiProperty({description: 'Дата замовлення' })
  @IsString()  
  orderDate: string

  @ApiProperty({description: 'Загальна сума замовлення' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ type: [OrderItemsDto], description: 'Елементи замовлення' })
  @IsArray()
  @ValidateNested({ each: true })
  orderItems: OrderItemsDto[];
}








// export class OrderItemsDto {
//   @ApiProperty({ example: 1, description: 'Ідентифікатор товару в замовленні' })
//   id: number;

//   @ApiProperty({ example: 1, description: 'Ідентифікатор замовлення' })
//   orderId: number;

//   @ApiProperty({ example: 1, description: 'Ідентифікатор продукту' })
//   productId: number;

//   @ApiProperty({ type: ProductDto, description: 'Дані продукту' })
//   product: ProductDto;

//   @ApiProperty({ example: 2, description: 'Кількість товару у замовленні' })
//   quantity: number;

//   @ApiProperty({ example: 50, description: 'Ціна за одиницю товару у замовленні' })
//   unitPrice: number;

//   @ApiProperty({ example: 100, description: 'Загальна вартість товару в замовленні' })
//   totalPrice: number;
// }
// export class OrdersDto {
//   @ApiProperty({ example: 1, description: 'Ідентифікатор замовлення' })
//   id: number;

//   @ApiProperty({ type: UserDTO, description: 'Дані користувача' })
//   user: UserDTO;

//   @ApiProperty({ example: '2024-02-20T12:00:00.000Z', description: 'Дата здійснення замовлення' })
//   orderDate: Date;

//   @ApiProperty({ example: 100, description: 'Загальна сума замовлення' })
//   totalAmount: number;

//   @ApiProperty({ type: [OrderItemsDto], description: 'Додаткові данні користувача' })
//   orderItems: OrderItemsDto[]
// }
