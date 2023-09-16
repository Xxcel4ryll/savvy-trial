import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import ProductAccessory from '../entities/product_accessories.entity';

@Injectable()
export default class ProductAccessoriesRepository {
  constructor(
    @Inject('PRODUCT_ACCESSORY_ENTITY')
    private readonly productsAccessoryEntity: typeof ProductAccessory,
  ) {}
  async addAccessory(productId, accessory:string[]): Promise<ProductAccessory[]> {
    console.log(accessory);
    
    try {
      let savedAccessories = []
      for (const item of accessory) {
        const savedAccessory = await this.productsAccessoryEntity.create<ProductAccessory>({
          productId,
          accessories: item
        })
        savedAccessories.push(savedAccessory)
      }
      return savedAccessories;
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