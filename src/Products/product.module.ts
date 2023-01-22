import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductProviders } from './providers/product.provider';
import ProductRepository from './repositories/product.repository';
import { ProductService } from './services/product.service';
import { ProductTypeController } from './controllers/product_type.controller';
import ProductTypeRepository from './repositories/product_type.repository';
import { ProductTypeService } from './services/product_type.service';

@Module({
  controllers: [ProductController, ProductTypeController],
  providers: [
    ProductService,
    ProductTypeService,
    ProductRepository,
    ProductTypeRepository,
    ...ProductProviders,
  ],
  exports: [
    ProductService,
    ProductTypeService,
    ProductRepository,
    ...ProductProviders,
  ],
})
export class ProductModule {}
