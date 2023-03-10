import ProductRepository from '../repositories/product.repository';
import ProductImageRepository from '../repositories/product_images.repository';
import ProductSpecsRepository from '../repositories/product_specifications.repository';
import ProductTypeRepository from '../repositories/product_type.repository';
import PurchasedProduct from 'src/Transactions/entities/purchased-product.entity';
export declare class ProductService {
    private purchasedProduct;
    private productRepository;
    private productTypeRepository;
    private productImageRepository;
    private productSpecsRepository;
    constructor(purchasedProduct: typeof PurchasedProduct, productRepository: ProductRepository, productTypeRepository: ProductTypeRepository, productImageRepository: ProductImageRepository, productSpecsRepository: ProductSpecsRepository);
    find(query: any): Promise<{
        count: number;
        products: import("../entities/product.entity").default[];
    }>;
    create(payload: any): Promise<{
        images: import("../entities/product_images.entity").default[];
        specifications: import("../entities/product_specification.entity").default[];
        id: string;
        name: string;
        title: string;
        brand: string;
        isVisible: boolean;
        salesOption: string;
        productTypes: import("../entities/product_type.entity").default;
        productTypeId: string;
        price: string;
        quantity: string;
        description: string;
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
    view(productId: any): Promise<import("../entities/product.entity").default>;
    search(query: any): Promise<import("../entities/product.entity").default>;
    productAvailability(products: any): Promise<any[]>;
    recordPurchasedProduct(products: any): void;
}
