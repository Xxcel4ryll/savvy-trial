import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import ProductRepository from '../repositories/product.repository';
import ProductImageRepository from '../repositories/product_images.repository';
import ProductSpecsRepository from '../repositories/product_specifications.repository';
import ProductTypeRepository from '../repositories/product_type.repository';
import PurchasedProduct from 'src/Transactions/entities/purchased-product.entity';
import { ProductDto } from '../dtos';
import { databaseProviders } from 'src/Database/providers';

import * as _ from 'lodash' 
const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class ProductService {
  constructor(
    @Inject('PURCHASED_ENTITY')
    private purchasedProduct: typeof PurchasedProduct,
    private productRepository: ProductRepository,
    private productTypeRepository: ProductTypeRepository,
    private productImageRepository: ProductImageRepository,
    private productSpecsRepository: ProductSpecsRepository
  ) {}

  async find(query) {
    const { count, rows: products } = await this.productRepository.find(
      _.omit(query, ['category'])
    );
    
    for (let product of products) {
      const images = await this.productImageRepository.find({
        productId: product.id
      });

      const specification = await this.productSpecsRepository.find({
        productId: product.id
      });

      const category = await this.productTypeRepository.findOne({
        id: product.productTypeId,
      }, ['name']);

      product.dataValues['images'] = images;
      product.dataValues['price'] = Number(product.price).toLocaleString();
      product.dataValues['specifications'] = specification;
      product.dataValues['category'] = category;
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

      if (payload?.images) {
        await this.productImageRepository.modify({
          id: payload.productId
        },
          payload.images
        );
      }

      if (payload?.specification) {
        await this.productSpecsRepository.modify({
          id: payload.productId,
        },
          payload.specification
        );
      }

      return !!product ? 'Product successfully updated!' :
      'Product failed to update'
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

    product['images'] = images;
    product['specifications'] = specification;

    return product;
  }

  async search(query) {
    const product = await this.productRepository.search(query);

    if (!product) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'Product',
          error: 'Product not found',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

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

  productAvailability(products) {
    return Promise.all(
      products.map(async product => {
        const isProduct = await this.productRepository.check({
          id: product.id,
        });

        if (!isProduct) {
          throw new HttpException(
            {
              statusCode: HttpStatus.PRECONDITION_FAILED,
              name: 'PRODUCT',
              error: 'Out of stock',
            },
            HttpStatus.PRECONDITION_FAILED,
          );
        }

        if (product.quantity >= isProduct.quantity) {
          throw new HttpException(
            {
              statusCode: HttpStatus.PRECONDITION_FAILED,
              name: 'PRODUCT',
              error: `${isProduct.name} has ${isProduct.quantity} units left`,
            },
            HttpStatus.PRECONDITION_FAILED,
          );
        }

        return {...isProduct,paidQuantity:product.quantity};
    }))
  }

  recordPurchasedProduct(products) {
    products.products.map(async product => {
      await this.purchasedProduct.create<PurchasedProduct>({
        transactionId: products.transactionId,
        paymentType: products.paymentType,
        userId: products.userId,
        productId: product.id,
        amount: product.price,
      })

      await this.productRepository.modify({
        id: product.id
      }, {
        quantity: parseInt(product.quantity) - parseInt(product.paidQuantity)
      });

    })
  }
}