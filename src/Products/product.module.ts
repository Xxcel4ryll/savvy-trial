import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductProviders } from './providers/product.provider';
import ProductRepository from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { ProductTypeController } from './controllers/product_type.controller';
import ProductTypeRepository from './repositories/product_type.repository';
import ProductImageRepository from './repositories/product_images.repository';
import ProductSpecsRepository from './repositories/product_specifications.repository';
import { ProductTypeService } from './services/product_type.service';
import { TransactionModule } from 'src/Transactions/transaction.module';
import { UserModule } from 'src/Users/user.module';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';
import BrandRepository from './repositories/brand.repository';

@Module({
  controllers: [ProductController, BrandController, ProductTypeController],
  providers: [
    ProductService,
    BrandService,
    ProductTypeService,
    ProductRepository,
    BrandRepository,
    ProductTypeRepository,
    ProductImageRepository,
    ProductSpecsRepository,
    ...ProductProviders,
  ],
  exports: [
    ProductService,
    ProductTypeService,
    ProductRepository,
    ...ProductProviders,
  ],
  imports: [
    forwardRef(() => UserModule), 
    forwardRef(() => TransactionModule)
  ]
})
export class ProductModule {}
