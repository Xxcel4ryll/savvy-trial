import Product from '../entities/product.entity';
import ProductType from '../entities/product_type.entity';
import ProductPrice from '../entities/product_price.entity';
import ProductImage from '../entities/product_images.entity';
import ProductSpecification from '../entities/product_specification.entity';
import Brand from '../entities/brand.entity';
import ProductAccessory from '../entities/product_accessories.entity';
export declare const ProductProviders: ({
    provide: string;
    useValue: typeof Product;
} | {
    provide: string;
    useValue: typeof ProductType;
} | {
    provide: string;
    useValue: typeof ProductPrice;
} | {
    provide: string;
    useValue: typeof ProductImage;
} | {
    provide: string;
    useValue: typeof ProductSpecification;
} | {
    provide: string;
    useValue: typeof Brand;
} | {
    provide: string;
    useValue: typeof ProductAccessory;
})[];
