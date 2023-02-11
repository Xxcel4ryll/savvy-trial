import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import ProductRepository from '../repositories/product.repository';
import ProductImageRepository from '../repositories/product_images.repository';
import ProductSpecsRepository from '../repositories/product_specifications.repository';
import { ProductDto } from '../dtos';
import { databaseProviders } from 'src/Database/providers';

const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productImageRepository: ProductImageRepository,
    private productSpecsRepository: ProductSpecsRepository) {}

  async find(query) {
    const { count, rows: products } = await this.productRepository.find(query);

    for (let product of products) {
      const images = await this.productImageRepository.find({
        productId: product.id
      });

      const specification = await this.productSpecsRepository.find({
        productId: product.id
      });

      product.dataValues['images'] = images;
      product.dataValues['specifications'] = specification;
    }

    return { count, products };
  }

  async create(payload) {
    const transaction = (await sequelize).transaction();
    try {
      const product = await this.productRepository.create(payload);

      const images = await this.productImageRepository.addImages(
        product.id,
        payload.images
      );

      const specifications = await this.productSpecsRepository.addSpecification(
        product.id,
        payload.specification
      );

      return {...product.dataValues,images,specifications};
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

  async update(payload) {
    const transaction = (await sequelize).transaction();
    try {
      const [product] = await this.productRepository.modify({
        id: payload.productId
      }, payload);

      const images = await this.productImageRepository.modify({
        id: payload.productId
      },
        payload.images
      );

      const specifications = await this.productSpecsRepository.modify({
        id: payload.productId,
      },
        payload.specification
      );

      if (product) {
        return 'Product successfully updated!';
      }
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

  async view(productId) {
    const product = await this.productRepository.check({
      id: productId
    });

    const images = await this.productImageRepository.find({
      productId: product.id
    });

    const specification = await this.productSpecsRepository.find({
      productId: product.id
    });

    product.dataValues['images'] = images;
    product.dataValues['specifications'] = specification;

    return product;
  }
}
