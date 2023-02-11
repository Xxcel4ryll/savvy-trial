import { Injectable, Inject } from '@nestjs/common';
import UserFavorites from '../entities/user_favourite.entity';

@Injectable()
export default class UserFavoritesRepository {
  constructor(
    @Inject('USER_FAVOURITES_ENTITY')
    private readonly userFavouriteEntity: typeof UserFavorites,
  ) {}

  findById(id): Promise<UserFavorites> {
    return this.userFavouriteEntity.findOne<UserFavorites>({
      where: {
        id,
      },
    });
  }

  find(userId): Promise<{ rows: UserFavorites[]; count: number; }> {
    return this.userFavouriteEntity.findAndCountAll<UserFavorites>({
      where: {
        userId,
      },
    });
  }

  create(payload) {
    return this.userFavouriteEntity.findOrCreate<UserFavorites>({
      where: payload,
      defaults: payload,
      raw: true,
    });
  }

  modify(criteriaObj, updates) {
    return this.userFavouriteEntity.update<UserFavorites>(updates, {
      where: criteriaObj,
    });
  }
}
