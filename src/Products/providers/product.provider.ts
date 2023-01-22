import Product from '../entities/product.entity';
import ProductType from '../entities/product_type.entity';
import ProductPrice from '../entities/product_price.entity';

export const ProductProviders = [
  {
    provide: 'PRODUCT_ENTITY',
    useValue: Product,
  },
  {
    provide: 'PRODUCT_TYPE_ENTITY',
    useValue: ProductType,
  },
  {
    provide: 'PRODUCT_PRICE_ENTITY',
    useValue: ProductPrice,
  },
];
