import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import ProductRepository from '../repositories/product.repository';
import ProductImageRepository from '../repositories/product_images.repository';
import ProductSpecsRepository from '../repositories/product_specifications.repository';
import ProductTypeRepository from '../repositories/product_type.repository';
import PurchasedProduct from 'src/Transactions/entities/purchased-product.entity';
import { ProductDto } from '../dtos';
import { databaseProviders } from 'src/Database/providers';
import * as _ from 'lodash' 
import ProductAccessoriesRepository from '../repositories/product_accessories.repository';
import { FileService } from 'src/Files/services/file.service';
import { map } from 'rxjs';
const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class ProductService {
  constructor(
    @Inject('PURCHASED_ENTITY')
    private purchasedProduct: typeof PurchasedProduct,
    private productRepository: ProductRepository,
    private productTypeRepository: ProductTypeRepository,
    private productImageRepository: ProductImageRepository,
    private productSpecsRepository: ProductSpecsRepository,
    private productAcessoryRepository: ProductAccessoriesRepository,
    private fileService: FileService,
  ) {}

  async find(user, query) {
    return this.productRepository.find(
      user,
      _.omit(query, ['category'])
    );
  }

  async create(user, file, payload) {
    
    const transaction = (await sequelize).transaction();
    try {
      if (file.mainImage && file.productImages) {
        let mainImageFile = file.mainImage[0];
        let productImages = file.productImages;
        var uploadMainImage = await this.fileService.handleUploadedFile(mainImageFile);
        var uploadProductImage = await this.fileService.handleMultipleFiles(productImages)
      }else if(file.mainImage){
        let mainImageFile = file.mainImage[0];
        var uploadMainImage = await this.fileService.handleUploadedFile(mainImageFile);
      }else if(file.productImages) {
        let productImages = file.productImages;
        var uploadProductImage = await this.fileService.handleMultipleFiles(productImages)
      }

      if (uploadMainImage!= null && uploadProductImage.length > 0) {
        console.log('both images uploaed');
        
        payload.mainImage = uploadMainImage.url;
        var selectedProductImages: any[];
        selectedProductImages = uploadProductImage.map((e) => e.url);
      }else if (uploadMainImage) {
        console.log('only main');
        
        payload.mainImage = uploadMainImage.url;
      }else{
        console.log(false);
        
      }

      const product = await this.productRepository.create(user, {
        ...payload
      });

      const images = await this.productImageRepository.addImages(
        product.id,
        selectedProductImages,
      );

      const specifications = await this.productSpecsRepository.addSpecification(
        product.id,
        payload.specification
      );

      const accessories = await this.productAcessoryRepository.addAccessory(
        product.id,
        payload.accessory
      );

      return {...product.toJSON(),images,specifications, accessories};
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
      const updates = _.omit(payload, ['productId'])
      const [product] = await this.productRepository.modify({
        id: payload.productId
      }, updates);

      if (payload?.images) {
        await this.productImageRepository.modify({
          productId: payload.productId
        },
        {
          image: payload.images
        }
        );
      }

      if (payload?.specification) {
        await this.productSpecsRepository.modify({
          productId: payload.productId,
        },
          payload.specification
        );
      }

      (await transaction).commit();

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

  async view(user, productId) {
    const product = await this.productRepository.check(
      user,
      {id: productId}
    );

    const images = await this.productImageRepository.find({
      productId: product.id
    });

    const specification = await this.productSpecsRepository.find({
      productId: product.id
    });

    const accessories = await this.productAcessoryRepository.find({
      productId: product.id
    })

    product.dataValues['images'] = images;
    product.dataValues['specifications'] = specification;
    product.dataValues['accessories'] = accessories;

    return product;
  }

  async search(user, query) {
    const product = await this.productRepository.search(user, query);

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

        if (product.quantity >= isProduct.dataValues.quantity) {
          throw new HttpException(
            {
              statusCode: HttpStatus.PRECONDITION_FAILED,
              name: 'PRODUCT',
              error: `${isProduct.dataValues.name} has 
                ${isProduct.dataValues.quantity} units left`,
            },
            HttpStatus.PRECONDITION_FAILED,
          );
        }

        return {...isProduct.dataValues,paidQuantity:product.quantity};
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
  async deleteProduct(productId) {
    return this.productRepository.delete(productId)
  }
}