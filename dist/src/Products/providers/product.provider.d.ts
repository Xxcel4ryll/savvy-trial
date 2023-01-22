import Product from '../entities/product.entity';
import ProductType from '../entities/product_type.entity';
import ProductPrice from '../entities/product_price.entity';
export declare const ProductProviders: ({
    provide: string;
    useValue: typeof Product;
} | {
    provide: string;
    useValue: typeof ProductType;
} | {
    provide: string;
    useValue: typeof ProductPrice;
})[];
