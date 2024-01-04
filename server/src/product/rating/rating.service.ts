import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RatingDto } from './rating.Dto';

@Injectable()
export class RatingService {

    constructor(private db: DbService) {}

  async createRating(value: number, productId: number, userId: number): Promise<RatingDto> {
    const newRating = await this.db.rating.create({
      data: {
        value,
        productId,
        userId,
      },
    });
    return newRating;
  }

  async getRatingById(id: number): Promise<RatingDto | null> {
    const rating = await this.db.rating.findUnique({
      where: {
        id,
      },
    });
    return rating;
  }

  async updateRating(id: number, newValue: number): Promise<RatingDto | null> {
    const updatedRating = await this.db.rating.update({
      where: {
        id,
      },
      data: {
        value: newValue,
      },
    });
    return updatedRating;
  }

  async deleteRating(id: number): Promise<RatingDto | null> {
    const deletedRating = await this.db.rating.delete({
      where: {
        id,
      },
    });
    return deletedRating;
  }
}
