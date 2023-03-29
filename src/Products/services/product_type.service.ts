import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import ProductTypeRepository from '../repositories/product_type.repository';
import { ProductTypeDto } from '../dtos';
import { databaseProviders } from 'src/Database/providers';
import ProductsRepository from '../repositories/product.repository';

// const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class ProductTypeService {
  constructor(
    private products: ProductsRepository,
    private productTypeRepository: ProductTypeRepository
  ) {}

  async find(query) {
    const { rows } = await this.productTypeRepository.find(query);

    const productTypesWithProducts = await Promise.all(rows.map(async productType => {
      const { rows: products } = await this.products.find({
        limit: 30, 
        offset: 0, 
        productTypeId: productType.id
      });
      
      return {
        ...productType.dataValues,
        products
      }
    }))

    return productTypesWithProducts;
  }

  async create(payload) {
    const [productType, created] = await this.productTypeRepository.create(
      payload,
    );

    if (created) {
      return productType;
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        name: 'PRODUCT_TYPE',
        error: 'Already Created',
      },
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
