import ProductsSpecification from '../entities/product_specification.entity';
export default class ProductSpecsRepository {
    private readonly productsSpecificationEntity;
    constructor(productsSpecificationEntity: typeof ProductsSpecification);
    addSpecification(productId: any, specs: any): Promise<ProductsSpecification[]>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find(criteria: any): Promise<ProductsSpecification[]>;
    check(criteria: any): Promise<ProductsSpecification>;
}
