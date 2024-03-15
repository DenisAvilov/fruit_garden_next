import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { RatingDto} from './ratingDto'



@Injectable()
export class RatingService {

    constructor(private db: DbService) {}
async addOrUpdateRating(productId: number, value: number, userId?: number): Promise<RatingDto> {
  let existingRating

  if (userId) {
    existingRating = await this.db.rating.findFirst({
      where: { productId, userId }
    })
  }

  if (existingRating) {    
    const updatedRating = await this.db.rating.update({
      where: { id: existingRating.id },
      data: { value }
    })

    const productRatings = await this.db.rating.findMany({
      where: { productId }
    })
   
    const totalRating = productRatings.reduce((acc, rating) => acc + rating.value, 0)
    const totalVotes = productRatings.length
    const averageRating = +(totalRating / totalVotes).toFixed(1)
    const goodVotes = productRatings.filter(rating => rating.value >= 4).length

    await this.db.product.update({
      where: { id: productId },
      data: {
        goodVotes,
        totalVotes,
        totalRating: averageRating
      }
    })

    return { ...updatedRating }
  } else {
    // Додати новий рейтинг
    const rating = await this.db.rating.create({
      data: { value, productId, userId }
    })

    // Отримати всі оцінки для цього продукту
    const productRatings = await this.db.rating.findMany({
      where: { productId }
    })
   
    const totalRating = productRatings.reduce((acc, rating) => acc + rating.value, 0)
    const totalVotes = productRatings.length
    const averageRating = +(totalRating / totalVotes).toFixed(1)    
    const goodVotes = productRatings.filter(rating => rating.value >= 4).length

    await this.db.product.update({
      where: { id: productId },
      data: {
        goodVotes,
        totalVotes,
        totalRating: averageRating
      }
    })

    return rating
  }
}}
