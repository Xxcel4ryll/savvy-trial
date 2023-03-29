import { ProductTypeService } from '../services/product_type.service';
import { ProductTypeDto } from '../dtos/index';
import { Request } from 'express';
export declare class ProductTypeController {
    private productTypeService;
    constructor(productTypeService: ProductTypeService);
    getProductTypes(req: Request): Promise<{
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
    createProductType(productType: ProductTypeDto): Promise<import("../entities/product_type.entity").default>;
}
