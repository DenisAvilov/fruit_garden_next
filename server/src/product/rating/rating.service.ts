import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RatingDto, TotalRatingDto } from './ratingDto';



@Injectable()
export class RatingService {

    constructor(private db: DbService) {}
async addOrUpdateRating(
   productId: number, 
   value: number,
   userId?: number): Promise<RatingDto> {

   // Пошук існуючого рейтингу за productId та userId
  const existingRating = await this.db.rating.findFirst({
    where: { productId, userId }
  });
    console.log('existingRating', existingRating)
  // Оновлення чи створення нового рейтингу
  if (existingRating) {    
    const updatedGoodVotes = (value >= 4) ? existingRating.goodVotes + 1 : existingRating.goodVotes;

    const updatedRating = await this.db.rating.update({
      where: { id: existingRating.id },
      data: {
        value,        
        goodVotes: updatedGoodVotes
      }
    });

    return { ...updatedRating };
  } else {
    const rating = await this.db.rating.create({
      data: {
        value,
        productId,
        userId,
        totalVotes: 1,       
        goodVotes: (value >= 4) ? 1 : 0,

      }
    })
    return rating
  }
}

async processRating(productId: number)  {
  const productRatings = await this.db.rating.findMany({
    where: { productId }
  });

  if (productRatings.length === 0) {
    return null; // Повернути null, якщо немає жодного рейтингу для продукту
  }

  const goodVotes = productRatings.filter(rating => rating.value >= 4).length;
  const totalVotes = productRatings.length;
  const totalRating = productRatings.reduce((acc, rating) => acc + rating.value, 0);

  const processedRating: TotalRatingDto = {
    productId,
    goodVotes,
    totalVotes,
    totalRating,
    ratings: productRatings.map(rating => {
      return {
        id: rating.id,
        value: rating.value,
        productId: rating.productId,
        goodVotes: rating.goodVotes,
        totalVotes: rating.totalVotes,
        userId: rating.userId

      };
    })
  };

  return processedRating;
}
 
}
