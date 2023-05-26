import { BrandService } from '../services/Brand.service';
import { BrandDto } from '../dtos/index';
import { Request } from 'express';
export declare class BrandController {
    private brandService;
    constructor(brandService: BrandService);
    getBrands(req: Request): Promise<{
        rows: import("../entities/brand.entity").default[];
        count: number;
    }>;
    createBrand(req: Request, brandPayload: BrandDto): Promise<import("../entities/brand.entity").default>;
}
