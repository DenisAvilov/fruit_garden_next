import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreatePriceDto } from './createPriceDto';
// import { PriceDto } from './priceDto';
// import { PriceItemDto } from './createPriceDto';

@Injectable()
export class PriceService {
  constructor(private db: DbService){}

  async createPrice(createPriceDto: CreatePriceDto) {
    const { prices, } = createPriceDto;
console.log(prices)
    

    return prices;
  }
}
