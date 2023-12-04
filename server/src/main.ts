import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Pastila')
    .setDescription('The Pastila online store API description')
    .setVersion('2.0')
    .addTag('Зефірна магія', 'Бренд солодкого та корисного')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Добовляем как глобальний мідлфєєр, она овтамотически добовляет в ответи разпарсение куки
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
