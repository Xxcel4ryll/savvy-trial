import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import ProductImage from '../entities/product_images.entity';

@Injectable()
export default class ProductImageRepository {
  constructor(
    @Inject('PRODUCT_IMAGE_ENTITY')
    private readonly productImageEntity: typeof ProductImage,
  ) {}
  addImages(productId, images): Promise<ProductImage[]> {
    try {
      return this.productImageEntity.bulkCreate<ProductImage>(
        images.map((image) => ({
          productId,
          image,
        })),
      );
    } catch (error) {
      throw error;
    }
  }

  modify(criteria, updates): Promise<[affectedCount: number]> {
    return this.productImageEntity.update<ProductImage>(updates, {
      where: criteria,
    });
  }

  find(criteria): Promise<ProductImage[]> {
    return this.productImageEntity.findAll<ProductImage>({
      where: criteria,
      raw: true
    });
  }

  check(criteria): Promise<ProductImage> {
    return this.productImageEntity.findOne<ProductImage>({
      where: criteria,
    });
  }
}
