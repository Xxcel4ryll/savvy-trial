import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Op } from 'sequelize';
import Products from '../entities/product.entity';
import ProductType from '../entities/product_type.entity';
import ProductImages from '../entities/product_images.entity';
import ProductSpecs from '../entities/product_specification.entity';
import UserFavourite from 'src/Users/entities/user_favourite.entity';

@Injectable()
export default class ProductsRepository {
  constructor(
    @Inject('PRODUCT_ENTITY')
    private readonly productEntity: typeof Products,
    @Inject('PRODUCT_IMAGE_ENTITY')
    private readonly productImages: typeof ProductImages,
    @Inject('PRODUCT_SPECS_ENTITY')
    private readonly productSpecs: typeof ProductSpecs,
    @Inject('PRODUCT_TYPE_ENTITY')
    private productType: typeof ProductType,
    @Inject('USER_FAVOURITES_ENTITY')
    private favouriteEntity: typeof UserFavourite,
  ) {}
  async create(user, payload): Promise<Products> {
    const productExist = await this.check(user, {
      name: payload.name,
      productType: payload.productType
    });

    if (productExist) {
      throw new Error('Product already exist!')
    }

    return this.productEntity.create<Products>(payload);
  }

  modify(criteria, updates): Promise<[affectedCount: number]> {
    return this.productEntity.update<Products>(updates, {
      where: criteria,
    });
  }

  find(user, { limit, offset, ...criteria}): Promise<{ rows: Products[]; count: number }> {    
    return this.productEntity.findAndCountAll<Products>({
      where: criteria,
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
      include: [  
        {
          model: this.productImages,
          attributes: ['productId', 'image']
        }, 
        {
          model: this.productSpecs,
          attributes: ['productId', 'specifications']
        },
        {
          model: this.productType,
          attributes: ['name']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit) || 10,
      offset: parseInt(offset) || 0
    });
  }

  findAll({ limit, offset, ...criteria}): Promise<{ rows: Products[]; count: number }> {    
    return this.productEntity.findAndCountAll<Products>({
      where: criteria,
      include: [  
        {
          model: this.productImages,
          attributes: ['productId', 'image']
        }, 
        {
          model: this.productSpecs,
          attributes: ['productId', 'specifications']
        },
        {
          model: this.productType,
          attributes: ['name']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit) || 10,
      offset: parseInt(offset) || 0
    });
  }

  check(user?, criteria?): Promise<Products> {
    return this.productEntity.findOne<Products>({
      where: criteria,
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

  search(user, query): Promise<Products> {
    return this.productEntity.findOne<Products>({
      where: {
        isVisible: true,
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            brand: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            price: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${query}%`,
            },
          },
        ]
      },
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

  async delete(productId)  {
    const deleteProductAccessories = await this.productImages.destroy<ProductImages>({
      where: {
        id:productId
      },
    });
    const deleteProductSpecs = await this.productSpecs.destroy<ProductSpecs>({
      where: {
        id:productId
      },
    });
    if (deleteProductSpecs && deleteProductAccessories) {
      const deleteProduct =  this.productEntity.destroy<Products>({
        where: {
          id:productId
        },
      });
    }
    

    return [ deleteProductAccessories, deleteProductAccessories]
  }
}
