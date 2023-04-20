import { Injectable, Inject } from '@nestjs/common';
import Product from '../entities/product.entity';
import ProductTypes from '../entities/product_type.entity';

@Injectable()
export default class ProductTypesRepository {
  constructor(
    @Inject('PRODUCT_TYPE_ENTITY')
    private readonly productTypesEntity: typeof ProductTypes,
    @Inject('PRODUCT_ENTITY')
    private readonly productEntity: typeof Product,
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

  find(criteria): Promise<{ rows: ProductTypes[]; count: number }> {    
    return this.productTypesEntity.findAndCountAll<ProductTypes>({
      where: criteria,
      include: {
        model: this.productEntity
      }
    });
  }

  findOne(criteria, attributes = []): Promise<ProductTypes> {
    return this.productTypesEntity.findOne<ProductTypes>({
      where: criteria,
      attributes
    });
  }
}
