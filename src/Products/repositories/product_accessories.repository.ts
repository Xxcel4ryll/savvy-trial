import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import ProductAccessory from '../entities/product_accessories.entity';

@Injectable()
export default class ProductAccessoriesRepository {
  constructor(
    @Inject('PRODUCT_ACCESSORY_ENTITY')
    private readonly productsAccessoryEntity: typeof ProductAccessory,
  ) {}
  addAccessory(productId, accessory): Promise<ProductAccessory[]> {
    try {
      return this.productsAccessoryEntity.bulkCreate<ProductAccessory>(
        accessory.map((spec) => ({
          productId,
          accessories: spec
        })),
      );
    } catch (error) {
      throw error;
    }
  }

  modify(criteria, updates): Promise<[affectedCount: number]> {
    return this.productsAccessoryEntity.update<ProductAccessory>(updates, {
      where: criteria,
    });
  }

  find(criteria): Promise<ProductAccessory[]> {
    return this.productsAccessoryEntity.findAll<ProductAccessory>({
      where: criteria,
      raw: true
    });
  }


  check(criteria): Promise<ProductAccessory> {
    return this.productsAccessoryEntity.findOne<ProductAccessory>({
      where: criteria,
    });
  }
}