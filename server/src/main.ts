import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   
 const globalOptions = new DocumentBuilder()

  const authOptions = globalOptions
    .setTitle('Регістрація, авторізація на сайті зефірна магія.')
    .setDescription('Опис API Авторізації та регістрації користувачів.')
    .setVersion('1.0')    
    .addTag('auth', 'запити повязані з авторізциї. ')
    .build();
  const auth = SwaggerModule.createDocument(app, authOptions, {
    include: [AuthModule],
  });
  SwaggerModule.setup('api/auth', app, auth);

   const accountOptions = globalOptions
    .setTitle('Акаунт користувача на сайті зефірна магія.')
    .setDescription('Опис API акаунта користувача.')
    .setVersion('1.0')
    .addTag('account', 'запити щодо акаунта користувача.')
    .build();
  const account = SwaggerModule.createDocument(app, accountOptions, {
    include: [AccountModule],
  });
  SwaggerModule.setup('api/account', app, account);


   const productOptions = globalOptions
    .setTitle('Продукти на сайті зефірна магія.')
    .setDescription('Опис API продуктів користувача.')
    .setVersion('1.0')
    .addTag('product', 'запити щодо продуктів магазину.')
    .build();

  const product = SwaggerModule.createDocument(app, productOptions, {
    include: [ProductModule],
    // ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('api/product', app, product);
  

 const basketOptions = globalOptions
    .setTitle('Карзина на сайту.')
    .setDescription('Опис API корзини користувача.')
    .setVersion('1.0')
    .addTag('basket', 'запити щодо карзини корестувачів.')
    .build();

  const basket = SwaggerModule.createDocument(app, basketOptions, {
    include: [BasketModule],
    // ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('api/basket', app, basket);


  const config = globalOptions
    .setTitle('Інтернет магазин зефірна магія.')
    .setDescription('Опис всіх API.')
    .setVersion('1.0')     
    // .addTag('', 'запити головної сторінки магазину.')
    .build();
  const appDocument = SwaggerModule.createDocument(app, config, {
    include: [AppModule, AuthModule, AccountModule, ProductModule, BasketModule],
  });

  SwaggerModule.setup('api', app, appDocument, {
    swaggerOptions: {
      // tagsSorter: 'alpha', // Сортування тегів в алфавітному порядку
      extraModels: [AuthModule, AccountModule, ProductModule,],
      deepScanRoutes: false,
      include: [AuthModule, AccountModule, ProductModule,],
    },
    
    // explorer: true,
    // swaggerUrl: 'localhost:3000/api#/',
    customSiteTitle: 'Зефірна магія API',
  });

  //Добовляем как глобальний мідлфєєр, она овтамотически добовляет в ответи разпарсение куки
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(`${process.env.SERVER_PORT}`);
}
bootstrap();
