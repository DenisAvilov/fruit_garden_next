import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { CookieService } from 'src/auth/cookie.service';
import { ProductController } from './product.controller';
import { DbService } from 'src/db/db.service';
import { AccountService } from 'src/account/account.service';
import { AccountModule } from 'src/account/account.module';
import { BrandService } from './brand/brand.service';
import { CategoryService } from './category/category.service';
import { SubcategoryService } from './subcategory/subcategory.service';
import { SmakuService } from './smaku/smaku.service';
import { RatingService } from './rating/rating.service';
import { CommentService } from './comment/comment.service';
import { PriceService } from './price/price.service';
import { WeightService } from './weight/weight.service';
import { SizesService } from './sizes/sizes.service';
import { AdditionalService } from './additional/additional.service';

@Module({
  imports:[AccountModule],
  controllers: [ProductController],
  providers: [ProductService, DbService, CookieService, AccountService, BrandService, CategoryService, SubcategoryService,  SmakuService, RatingService, CommentService, PriceService, WeightService, SizesService, AdditionalService],

})
export class ProductModule {}
