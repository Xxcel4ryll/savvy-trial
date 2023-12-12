import { Injectable, Inject } from '@nestjs/common';
import UserFavourite from 'src/Users/entities/user_favourite.entity';
import Product from '../entities/product.entity';
import ProductTypes from '../entities/product_type.entity';

@Injectable()
export default class ProductTypesRepository {
  constructor(
    @Inject('PRODUCT_TYPE_ENTITY')
    private readonly productTypesEntity: typeof ProductTypes,
    @Inject('PRODUCT_ENTITY')
    private readonly productEntity: typeof Product,
    @Inject('USER_FAVOURITES_ENTITY')
    private favouriteEntity: typeof UserFavourite,
  ) {}
  create(payload): Promise<[ProductTypes, boolean]> {
    return this.productTypesEntity.findOrCreate<ProductTypes>({
      where: {
        name: payload.name,
      },
      defaults: payload,
      raw: true,
    });
  }

  modify(criteria, updates): Promise<[affectedCount: number]> {
    return this.productTypesEntity.update<ProductTypes>(updates, {
      where: criteria,
    });
  }

  find(user, criteria): Promise<{ rows: ProductTypes[]; count: number }> {    
    return this.productTypesEntity.findAndCountAll<ProductTypes>({
      where: criteria,
      include: {
        model: this.productEntity,
        attributes: {
          include: [
            [
              this.favouriteEntity.isUserFavouriteQuery({
              userId: user.id,
              column: `'${this.productEntity.name}.id'` // Line logic is wrong (update)
              }), 
            'isFavorite'],
          ],
        },
      }
    });
  }

  findOneandPopulate(user, where): Promise<ProductTypes> {    
    return this.productTypesEntity.findOne<ProductTypes>({
      where,
      include: {
        model: this.productEntity,
        attributes: {
          include: [
            [
              this.favouriteEntity.isUserFavouriteQuery({
              userId: user.id,
              column: `'${this.productEntity.name}.id'` // Line logic is wrong (update)
              }), 
            'isFavorite'],
          ],
        },
      }
    });
  }

  findandPopulate(user, where): Promise<Product[]> {    
    return this.productEntity.findAll<Product>({
      where,
      attributes: {
				include: [
					[
            this.favouriteEntity.isUserFavouriteQuery({
            userId: user.id,
            column: `${this.productEntity.name}.id`
          }), 
          'isFavorite'],
				],
			},
    });
  }

  findType(where) : Promise<ProductTypes> {
    return this.productTypesEntity.findOne<ProductTypes>({
      where
    })
  }
  

  findOne(criteria, attributes = []): Promise<ProductTypes> {
    console.log(criteria, attributes);
    
    return this.productTypesEntity.findOne<ProductTypes>({
      where: criteria,
      attributes
    });
  }
}
