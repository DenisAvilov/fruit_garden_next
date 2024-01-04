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
import { PriceService } from './product/price/price.service';
import { SizesService } from './product/sizes/sizes.service';
import { WeightService } from './product/weight/weight.service';
import { AdditionalService } from './product/additional/additional.service';



@Module({
  imports: [AuthModule, UsersModule, DbModule, AccountModule, ProductModule],
  controllers: [AppController, ProductController],
  providers: [
    AppService, DbService, ProductService,
    BrandService, CategoryService, SubcategoryService,
    SmakuService, RatingService, PriceService,
    SizesService, WeightService, AdditionalService],
})
export class AppModule {}
