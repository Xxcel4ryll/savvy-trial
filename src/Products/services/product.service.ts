import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import ProductRepository from '../repositories/product.repository';
import { ProductDto } from '../dtos';
import { databaseProviders } from 'src/Database/providers';

const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  find(query) {
    return this.productRepository.find(query);
  }

  async create(payload) {
    const transaction = (await sequelize).transaction();
    try {
      return this.productRepository.create(payload);
    } catch (error) {
      (await transaction).rollback();
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'UNAUTHORIZED',
          error: error.message,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
