import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DbService } from './db/db.service';
// import { ProductDto } from './product/productDto';
// import { LimitPages } from './helpers/helpers';
import { ProductService } from './product/product.service';

@ApiTags()
@Controller()
export class AppController {
  constructor(    
    private dbService: DbService,
    private productService: ProductService
  ) {}
  

}

