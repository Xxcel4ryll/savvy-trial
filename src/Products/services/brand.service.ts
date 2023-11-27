import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import BrandRepository from '../repositories/brand.repository';
import { ProductDto } from '../dtos';
import { databaseProviders } from 'src/Database/providers';
import ProductsRepository from '../repositories/product.repository';
const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class BrandService {
  constructor(
    private brandRepository: BrandRepository,
    private productRepository: ProductsRepository
  ) {}

  async find(query) {
    return this.brandRepository.find(query)
  }

  async viewBrandProduct(query, brand) {
    const where = {
      brand: brand
    }
    console.log(where);
    
    let data = {
      where: where,
      limit: query.limit,
      offset: query.offset
    }
    const fetchProducts = await this.productRepository.findAllBrandsProducts(data);
    return fetchProducts;
  }

  async create(payload) {
    const transaction = (await sequelize).transaction();
    try {
      const [brand, created] = await this.brandRepository.create(payload);

      if (created) {
        throw 'Brand already created!'
      }

      return brand;
    } catch (error) {
      (await transaction).rollback();
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: error.name,
          error: error.message,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}