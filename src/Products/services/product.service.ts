import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import ProductRepository from '../repositories/product.repository';
import ProductImageRepository from '../repositories/product_images.repository';
import ProductSpecsRepository from '../repositories/product_specifications.repository';
import ProductTypeRepository from '../repositories/product_type.repository';
import PurchasedProduct from 'src/Transactions/entities/purchased-product.entity';
import { ProductDto, UpdateRentStart } from '../dtos';
import { databaseProviders } from 'src/Database/providers';
import * as _ from 'lodash' 
import ProductAccessoriesRepository from '../repositories/product_accessories.repository';
import { FileService } from 'src/Files/services/file.service';
import * as moment from 'moment';
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

  async findAll(query) {
    return this.productRepository.findAll(query);
  }

  async create(user,payload, file?) {
    console.log('running all image');
    if (file.mainImage && file.productImages) {
      let mainImageFile = file.mainImage[0];
      let productImages = file.productImages;
      var uploadMainImage = await this.fileService.handleUploadedFile(mainImageFile);
      var uploadProductImage = await this.fileService.handleMultipleFiles(productImages)
      payload.mainImage = uploadMainImage.url;
      var selectedProductImages: any[];
        selectedProductImages = uploadProductImage?.map((e) => e.url);
    }else if(file.mainImage && file.productImages == null){
      console.log('running only main image');
      let mainImageFile = file.mainImage[0];
      var uploadMainImage = await this.fileService.handleUploadedFile(mainImageFile);
      payload.mainImage = uploadMainImage.url;
    }else if(file.productImages && file.mainImage == null) {
      console.log('running only product image');
      
      let productImages = file.productImages;
      var uploadProductImage = await this.fileService.handleMultipleFiles(productImages);
      var selectedProductImages: any[];
        selectedProductImages = uploadProductImage?.map((e) => e.url);
    }else{
      payload.mainImage == null,
      selectedProductImages = []
    }
    payload.name = payload.title
    
    const transaction = (await sequelize).transaction();
    try {
      let accessories;
      let specifications;
      const product = await this.productRepository.create(user, {
        ...payload,
      });

      if (selectedProductImages != null) {
        
        var images = await this.productImageRepository.addImages(
          product.id,
          selectedProductImages,
        );
      }
      if (payload.specifications) {
        const savedspecifications = await this.productSpecsRepository.addSpecification(
          product.id,
          payload.specifications
        );
        specifications = savedspecifications;
      }
      if (payload.accessories) {
        const savedAccessories = await this.productAcessoryRepository.addAccessory(
          product.id,
          payload.accessories
        );
        accessories = savedAccessories;
      }
      

      return {...product.toJSON(),images, specifications, accessories};
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
    });

    const purchasedProduct = await this.purchasedProduct.findOne<PurchasedProduct>({
      where: {
        productId: product.id
      }
    })

    product.dataValues['images'] = images;
    product.dataValues['specifications'] = specification;
    product.dataValues['accessories'] = accessories;
    product.dataValues['purchasedProduct'] = purchasedProduct;

    return product;
  }

  async search(user, query) {
    const results = [];
    const products = await this.productRepository.searchAll(user, query);

    if (!products) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'Product',
          error: 'Product not found',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    for (const product of products) {
      const images = await this.productImageRepository.find({
        productId: product.id
      });
  
      const specification = await this.productSpecsRepository.find({
        productId: product.id
      });
  
      product.dataValues['images'] = images;
      product.dataValues['specifications'] = specification;
      
      results.push(product);
    }

    

    return results;
  }

  productAvailability(products) {
    return Promise.all(
      products.map(async product => {
        const isProduct = await this.productRepository.checkProduct(product.id)
        console.log(isProduct);
        

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

  async addRentConfirmTime(productId, payload: UpdateRentStart) {
   const product = await this.productRepository.findOne(productId);

   if (product.productType != "RENT") {
    throw new HttpException(
      {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        name: 'PRODUCT',
        error: `${product.name} is for ${product.productType}`,
      },
      HttpStatus.PRECONDITION_FAILED,
    );
   }else{
      return await this.productRepository.modify({
        id: product.id
     }, {
      rent_start_time: payload.rentStart || moment(),
     })
   }
  }

 async increaseProductQuantity(productId, payload) {
  const product = await this.productRepository.findOne(productId);

  if (!product) {
   throw new HttpException(
     {
       statusCode: HttpStatus.PRECONDITION_FAILED,
       name: 'PRODUCT',
       error: `Product not found`,
     },
     HttpStatus.PRECONDITION_FAILED,
   );
  }else{
     return await this.productRepository.modify({
       id: product.id
    }, {
     quantity: product.quantity += payload.quantity || 1
    })
  }
 }




 async singleProduct(productId) {
  const product = await this.productRepository.check(
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
  });

  const purchasedProduct = await this.purchasedProduct.findOne<PurchasedProduct>({
    where: {
      productId: product.id
    }
  })

  product.dataValues['images'] = images;
  product.dataValues['specifications'] = specification;
  product.dataValues['accessories'] = accessories;
  product.dataValues['purchasedProduct'] = purchasedProduct;

  return product;
}
}