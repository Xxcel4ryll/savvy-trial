import { Injectable, Inject } from '@nestjs/common';
import Product from 'src/Products/entities/product.entity';
import ProductImages from 'src/Products/entities/product_images.entity';
import UserFavorites from '../entities/user_favourite.entity';

@Injectable()
export default class UserFavoritesRepository {
  constructor(
    @Inject('USER_FAVOURITES_ENTITY')
    private readonly userFavouriteEntity: typeof UserFavorites,
    @Inject('PRODUCT_ENTITY')
    private readonly productEntity: typeof Product,
    @Inject('PRODUCT_IMAGE_ENTITY')
    private readonly productImageEntity: typeof ProductImages,
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
      include: {
        model: this.productEntity,
        attributes: ['name', 'title', 'price', 'brand', 'quantity'],
        include: [
          {
            model: this.productImageEntity,
            attributes: ['image', 'productId']
          }
        ]
      }
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

  remove(criteriaObj) {
    return this.userFavouriteEntity.destroy<UserFavorites>({
      where: criteriaObj,
    });
  }
}
