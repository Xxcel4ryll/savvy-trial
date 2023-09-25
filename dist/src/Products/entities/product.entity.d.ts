import { Model } from 'sequelize-typescript';
import ProductTypes from './product_type.entity';
import ProductImages from './product_images.entity';
import ProductSpecs from './product_specification.entity';
import UserFavourite from 'src/Users/entities/user_favourite.entity';
import ProductAccessory from './product_accessories.entity';
export default class Product extends Model<Product> {
    id: string;
    name: string;
    title: string;
    brand: string;
    isVisible: boolean;
    productType: string;
    productTypes: ProductTypes;
    productTypeId: string;
    images: ProductImages[];
    specifications: ProductSpecs[];
    userFavourite: UserFavourite;
    accessories: ProductAccessory[];
    get price(): string;
    quantity: string;
    description: string;
    overview: string;
    label: string;
    mainImage: string;
    rent_start_time: Date;
    rent_end_time: Date;
}
