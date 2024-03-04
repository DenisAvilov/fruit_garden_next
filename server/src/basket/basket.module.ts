import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
// import { ProductService } from 'src/product/product.service';
// import { CookieService } from 'src/auth/cookie.service';
// import { MailService } from 'src/auth/mail.service';
import { BasketController } from './basket.controller';
import { DbService } from 'src/db/db.service';


@Module({
  
  controllers: [BasketController],
  providers: [BasketService, DbService]

})
export class BasketModule {}
