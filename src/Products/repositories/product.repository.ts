import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Op } from 'sequelize';
import Products from '../entities/product.entity';
import ProductPrice from '../entities/product_price.entity';

@Injectable()
export default class ProductsRepository {
  constructor(
    @Inject('PRODUCT_ENTITY')
    private readonly productEntity: typeof Products,
  ) {}
  async create(payload): Promise<Products> {
    const productExist = await this.check({
      name: payload.name,
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

  find({ limit, offset, ...criteria}): Promise<{ rows: Products[]; count: number }> {    
    return this.productEntity.findAndCountAll<Products>({
      where: criteria,
      limit: parseInt(limit) || 10,
      offset: parseInt(offset) || 0
    });
  }

  check(criteria): Promise<Products> {
    return this.productEntity.findOne<Products>({
      where: criteria,
      raw: true
    });
  }

  search(query): Promise<Products> {
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
    });
  }
}
