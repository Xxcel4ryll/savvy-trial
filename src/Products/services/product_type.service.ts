import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import ProductTypeRepository from '../repositories/product_type.repository';
import { ProductTypeDto } from '../dtos';
import { databaseProviders } from 'src/Database/providers';
import { Op } from 'sequelize';
import e from 'express';

// const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class ProductTypeService {
  constructor(
    private productTypeRepository: ProductTypeRepository
  ) {}

  find(user, query) {
    return this.productTypeRepository.find(user,query);
  }

  findOneAndPopulate(user,query) {
    const where = {
      name: query
    }
    return this.productTypeRepository.findOneandPopulate(user,where);
  }


  async filterOne(user, query){
    const where = {
      id: {
        [Op.like]: query
      }
    }
    const type = await this.productTypeRepository.findType(where);
    console.log(type);
    

    if (!type) {
      return {
        status: HttpStatus.OK,
        message: `No product found for ${query}`,
        products: []
      }
    }
    return await this.productTypeRepository.findOneandPopulate(user,where)
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
