import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import ProductTypeRepository from '../repositories/waitlist.repository';
import { WaitlistDto } from '../dtos';
import { databaseProviders } from 'src/database/providers';

// const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class WaitlistService {
  constructor(private productTypeRepository: ProductTypeRepository) {}

  find(query) {
    return this.productTypeRepository.find(query);
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
