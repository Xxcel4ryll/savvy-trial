import { ProductService } from '../services/product.service';
import { ProductDto } from '../dtos/index';
import { Request } from 'express';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(req: Request): Promise<{
        count: number;
        products: import("../entities/product.entity").default[];
    }>;
    createProduct(req: Request, product: ProductDto): Promise<{
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
    updateProduct(req: Request, product: ProductDto): Promise<"Product successfully updated!" | "Product failed to update">;
    searchProduct(req: Request): Promise<import("../entities/product.entity").default>;
    viewProduct(req: Request, { productId }: ProductDto): Promise<import("../entities/product.entity").default>;
}
