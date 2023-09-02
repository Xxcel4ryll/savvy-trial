import Product from '../entities/product.entity';
import ProductType from '../entities/product_type.entity';
import ProductPrice from '../entities/product_price.entity';
import ProductImage from '../entities/product_images.entity';
import ProductSpecification from '../entities/product_specification.entity';
import Brand from '../entities/brand.entity';
import ProductAccessory from '../entities/product_accessories.entity';

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
  {
    provide: 'PRODUCT_IMAGE_ENTITY',
    useValue: ProductImage,
  },
  {
    provide: 'PRODUCT_SPECS_ENTITY',
    useValue: ProductSpecification,
  },
  {
    provide: 'BRAND_ENTITY',
    useValue: Brand,
  },
  {
    provide: 'PRODUCT_ACCESSORY_ENTITY',
    useValue: ProductAccessory,
  },
];
