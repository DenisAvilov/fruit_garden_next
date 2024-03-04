import { BadRequestException, Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { PostBasketDto } from './PostBasketDto';
// import { OrderItemsDto } from 'src/users/orderItemDto';
// import { MailService } from 'src/auth/mail.service';
// import { TokenService } from 'src/auth/token.service';
// import { ProductService } from 'src/product/product.service';
// interface ProductInBasketCreateInput {
//   productId: number;
//   quantity: number;
//   basketId?: number; // Додайте обов'язкову властивість basketId
// }

@Injectable()
export class BasketService {
  constructor(

    private db: DbService   
  ){} 
  
 async getBasket(sessionUserId: number){  
  const basket = await this.db.basket.findMany({
      where: {
      userId: sessionUserId === 0? 506195452 : sessionUserId,
    },
    include: {          
      productsInBasket: true,           
    }    
  })

     if (!basket) {
      throw new Error('Корзина не знайдена');
    }
    
    const attributeBasketPromises = basket.map(async (item) => {
    const productIds = item.productsInBasket.map((product) => product.id);
    const attributeBasket = await this.db.productAttributeInBasket.findMany({
      where: {
        productInBasketId: {
          in: productIds,
        },
      },
    });
    return attributeBasket;
  });

  const attributeBasket = await Promise.all(attributeBasketPromises);
  return {basket, attributeBasket }
 }

async addBasket(sessionUserId: number, body: PostBasketDto) {
  try {
    let user;
    let temporaryUser;
    let existingBasket;
    const { phoneId } = body;

    if (sessionUserId) {
      user = await this.db.user.findUnique({
        where: { id: sessionUserId },
        include: { contact: true, account: true }
      });
    }

    if (phoneId) {
      temporaryUser = await this.db.temporaryUser.findUnique({
        where: { phone: phoneId }
      });

      if (!temporaryUser) {
        temporaryUser = await this.db.temporaryUser.create({ data: { phone: phoneId } });
      }
    }

    if (sessionUserId) {
      existingBasket = await this.db.basket.findUnique({
        where: { userId: sessionUserId }
      });
    } else if (temporaryUser) {
      existingBasket = await this.db.basket.findUnique({
        where: { phoneId: temporaryUser.id }
      });
    }

    if (existingBasket) {
      const productsInBasket = await this.db.productInBasket.findMany({
        where: { basketId: existingBasket.id }
      });

      const productAttributeIds = productsInBasket.map(product => product.id);

      await this.db.productAttributeInBasket.deleteMany({
        where: { productInBasketId: { in: productAttributeIds } }
      });

      await this.db.productInBasket.deleteMany({ where: { basketId: existingBasket.id } });
      await this.db.basket.delete({ where: { id: existingBasket.id } });
    }

    const productsInBasketData = body.productsInBasket.map((item) => {
      return { productId: item.productId, quantity: item.quantity, attributes: { create: item.attributes } };
    });

    const basketData = temporaryUser?.phone
      ? { phoneId: temporaryUser.id }
      : { userId: user.id };

    const basket = await this.db.basket.create({
      data: { ...basketData, additionalInfo: body.additionalInfo, productsInBasket: { create: productsInBasketData } }
    });

    const productsInBasket = await this.db.productInBasket.findMany({ where: { basketId: basket.id }, include: { attributes: true } });

    const totalAmount = productsInBasket.reduce((total, product) => {
      const productPrice = product.attributes.reduce((acc, attr) => acc + attr.price, 0);
      return total + product.quantity * productPrice;
    }, 0);

    await this.db.orders.create({
      data: {
        userId: user?.id,
        phone: temporaryUser?.phone,
        totalAmount: totalAmount,
        orderItems: {
          createMany: {
            data: productsInBasket.map(product => ({
              productId: product.productId,
              quantity: product.quantity,
              unitPrice: product.attributes.reduce((acc, attr) => acc + attr.price, 0),
              totalPrice: product.attributes.reduce((acc, attr) => acc + attr.price, 0) * product.quantity,
              subcategory: product.attributes[0]?.subcategory || null,
              brand: product.attributes[0]?.brand || null,
              smaks: product.attributes[0]?.smaks || null,
              weight: product.attributes.reduce((acc, attr) => acc + attr.weight, 0),
              unic: product.attributes[0]?.unic,
              size: product.attributes[0]?.size || null,
            }))
          }
        }
      }
    });

    return basket;
  } catch (error) {
    throw new BadRequestException({ type: `${error}` });
  }
}

  }
  

