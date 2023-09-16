import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import ProductsSpecification from '../entities/product_specification.entity';

@Injectable()
export default class ProductSpecsRepository {
  constructor(
    @Inject('PRODUCT_SPECS_ENTITY')
    private readonly productsSpecificationEntity: typeof ProductsSpecification,
  ) {}
  async addSpecification(productId, specs:string[]): Promise<ProductsSpecification[]> {
    try {
      const savedSpecs = [];
      for (const spec of specs) {
        const savedSpec = await this.productsSpecificationEntity.create<ProductsSpecification>({
          productId,
          specifications: spec
        })
        savedSpecs.push(savedSpec);
      }
      return savedSpecs;
    } catch (error) {
      throw error;
    }
  }

  modify(criteria, updates): Promise<[affectedCount: number]> {
    return this.productsSpecificationEntity.update<ProductsSpecification>(updates, {
      where: criteria,
    });
  }

  find(criteria): Promise<ProductsSpecification[]> {
    return this.productsSpecificationEntity.findAll<ProductsSpecification>({
      where: criteria,
      raw: true
    });
  }


  check(criteria): Promise<ProductsSpecification> {
    return this.productsSpecificationEntity.findOne<ProductsSpecification>({
      where: criteria,
    });
  }
}
