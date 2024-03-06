import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { BrandService } from './product/brand/brand.service';
import { CategoryService } from './product/category/category.service';
import { SubcategoryService } from './product/subcategory/subcategory.service';
import { SmakuService } from './product/smaku/smaku.service';
import { RatingService } from './product/rating/rating.service';
import { AdditionalService } from './product/additional/additional.service';
import { BasketService } from './basket/basket.service';
import { BasketModule } from './basket/basket.module';
import { CommentService } from './product/comment/comment.service';




@Module({
  imports: [AuthModule, UsersModule, DbModule, AccountModule,
     ProductModule, BasketModule],
  controllers: [AppController, ProductController,],
  providers: [
    AppService, DbService, ProductService,
    BrandService, CategoryService, SubcategoryService,
    SmakuService, RatingService,
    AdditionalService, BasketService, CommentService ],
})
export class AppModule {}
