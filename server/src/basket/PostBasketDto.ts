import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsOptional, ValidateNested, IsArray } from "class-validator";

export class PostProductAttributeInBasketDto {
  @ApiProperty({example: 'Зефір полуничний',description: 'Назва продукту' })
  @IsString()
  name: string;

  @ApiProperty({example: 'Зображення продукту',description: 'Зображення продукту' })
  @IsString()
  img: string;

  @ApiProperty({example:'Зефір класичний', description: 'Категорія' })
  @IsString()
  category: string;

  @ApiProperty({example: null, description: 'Підкатегорія' })
  @IsString()
  @IsOptional()
  subcategory?: string | null   

  @ApiProperty({example:'Зефірна магія', description: 'Бренд' })
  @IsString()
  brand: string;

  @ApiProperty({example:'Яблоко, груша',description: 'Смак' })
  @IsString()
  smaks: string;

  @ApiProperty({example:'750',description: 'Вага' })
  @IsNumber()
  weight: number;

  @ApiProperty({example:'гр.', description: 'Одиниці виміру кг або гр' })
  @IsString()
  unic: string

  @ApiProperty({example: 255.5, description: 'Ціна' })
  @IsNumber()
  price: number;

  @ApiProperty({example:'Середній', description: 'Розмір' })
  @IsString()
  @IsOptional()
  size?: string | null
  
}
export class PostProductInBasketDto {

  @ApiProperty({example: 1, description: 'Індифікатор одного товару в корзині' })
  @IsNumber()
  productId: number; 

  @ApiProperty({example: 1, description: 'Кількість товару в корзині' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ type: [PostProductAttributeInBasketDto], description: 'Характеристики продукту в корзині' })
  @ValidateNested({ each: true })
  attributes: PostProductAttributeInBasketDto[];


}
export class PostBasketDto { 
   
  @ApiProperty({example: undefined, description: 'Телефон корестувача якщо є.' })
  @IsString()
  @IsOptional()
  phoneId?: string 

  @ApiProperty({example: null, type: String, description: 'Додаткова інформація.' })
  @IsString()
  @IsOptional()
  additionalInfo?: string | null

  @ApiProperty({ type: [PostProductInBasketDto], description: 'Опис одного продукту в карзині.' })
  @IsArray()
  @ValidateNested({ each: true })
  productsInBasket: PostProductInBasketDto[]
}


export class PostOrderItemsDto {
  @ApiProperty({example: undefined, description: 'Індентифікатор елемента замовлення' })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({example: 1, description: 'Індентифікатор продукту' })
  @IsNumber()
  productId: number;

  @ApiProperty({example: 1, description: 'Кількість продукту' })
  @IsNumber()
  quantity: number;

  @ApiProperty({example:245.5, description: 'Ціна за одиницю товару' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({example:345.5, description: 'Загальна вартість продуктів в замовленні' })
  @IsNumber()
  totalPrice: number;
}
export class PostOrdersDto {
  @ApiProperty({example: undefined, description: 'Індентифікатор замовлення' })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({example: undefined, description: 'Індентифікатор користувача' })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({example: undefined, description: 'Індентифікатор користувача' })
  @IsNumber()
  @IsOptional()
  phoneId?: number;

  @ApiProperty({example:'дата замовлення', description: 'Дата замовлення' })
  @IsString()  
  orderDate: string

  @ApiProperty({example:1454, description: 'Загальна сума замовлення' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ type: [PostOrderItemsDto], description: 'Елементи замовлення' })
  @IsArray()
  @ValidateNested({ each: true })
  orderItems: PostOrderItemsDto[];
}



