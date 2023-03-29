import ProductTypeRepository from '../repositories/product_type.repository';
import ProductsRepository from '../repositories/product.repository';
export declare class ProductTypeService {
    private products;
    private productTypeRepository;
    constructor(products: ProductsRepository, productTypeRepository: ProductTypeRepository);
    find(query: any): Promise<{
        products: import("../entities/product.entity").default[];
        id: string;
        name: string;
        description: string;
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: import("../entities/product_type.entity").default;
        dataValues: import("../entities/product_type.entity").default;
        _creationAttributes: import("../entities/product_type.entity").default;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../entities/product_type.entity").default, import("../entities/product_type.entity").default>;
    }[]>;
    create(payload: any): Promise<import("../entities/product_type.entity").default>;
}
