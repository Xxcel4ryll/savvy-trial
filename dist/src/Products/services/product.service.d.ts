import ProductRepository from '../repositories/product.repository';
import ProductImageRepository from '../repositories/product_images.repository';
import ProductSpecsRepository from '../repositories/product_specifications.repository';
import ProductTypeRepository from '../repositories/product_type.repository';
import PurchasedProduct from 'src/Transactions/entities/purchased-product.entity';
import { UpdateRentStart } from '../dtos';
import ProductAccessoriesRepository from '../repositories/product_accessories.repository';
import { FileService } from 'src/Files/services/file.service';
export declare class ProductService {
    private purchasedProduct;
    private productRepository;
    private productTypeRepository;
    private productImageRepository;
    private productSpecsRepository;
    private productAcessoryRepository;
    private fileService;
    constructor(purchasedProduct: typeof PurchasedProduct, productRepository: ProductRepository, productTypeRepository: ProductTypeRepository, productImageRepository: ProductImageRepository, productSpecsRepository: ProductSpecsRepository, productAcessoryRepository: ProductAccessoriesRepository, fileService: FileService);
    find(user: any, query: any): Promise<{
        rows: import("../entities/product.entity").default[];
        count: number;
    }>;
    findAll(query: any): Promise<{
        rows: import("../entities/product.entity").default[];
        count: number;
    }>;
    create(user: any, payload: any, file?: any): Promise<{
        images: import("../entities/product_images.entity").default[];
        specifications: any;
        accessories: any;
        id: string;
        name: string;
        title: string;
        brand: string;
        isVisible: boolean;
        productType: string;
        productTypes: import("../entities/product_type.entity").default;
        productTypeId: string;
        userFavourite: import("../../Users/entities/user_favourite.entity").default;
        quantity: string;
        description: string;
        overview: string;
        label: string;
        mainImage: string;
        rent_start_time: Date;
        rent_end_time: Date;
        products: PurchasedProduct[];
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: import("../entities/product.entity").default;
        dataValues: import("../entities/product.entity").default;
        _creationAttributes: import("../entities/product.entity").default;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../entities/product.entity").default, import("../entities/product.entity").default>;
    }>;
    update(payload: any): Promise<"Product successfully updated!" | "Product failed to update">;
    view(user: any, productId: any): Promise<import("../entities/product.entity").default>;
    search(user: any, query: any): Promise<import("../entities/product.entity").default>;
    productAvailability(products: any): Promise<any[]>;
    recordPurchasedProduct(products: any): void;
    deleteProduct(productId: any): Promise<number[]>;
    addRentConfirmTime(productId: any, payload: UpdateRentStart): Promise<[affectedCount: number]>;
    increaseProductQuantity(productId: any, payload: any): Promise<[affectedCount: number]>;
}
