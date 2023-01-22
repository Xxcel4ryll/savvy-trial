import { Injectable, Inject } from '@nestjs/common';
import Products from '../entities/product.entity';

@Injectable()
export default class ProductsRepository {
  constructor(
    @Inject('PRODUCT_ENTITY')
    private readonly productEntity: typeof Products,
  ) {}
  create(payload): Promise<[Products, boolean]> {
    return this.productEntity.findOrCreate<Products>({
      where: {
        name: payload.name,
      },
      defaults: payload,
      raw: true,
    });
  }

  modify(criteria, updates): Promise<[affectedCount: number]> {
    return this.productEntity.update<Products>(updates, {
      where: criteria,
    });
  }

  find(criteria): Promise<{ rows: Products[]; count: number }> {
    return this.productEntity.findAndCountAll<Products>({
      where: criteria,
    });
  }
}
