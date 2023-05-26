import Brand from '../entities/brand.entity';
export default class BrandRepository {
    private readonly brandEntity;
    constructor(brandEntity: typeof Brand);
    create(payload: any): Promise<[Brand, boolean]>;
    find({ limit, offset, ...criteria }: {
        [x: string]: any;
        limit: any;
        offset: any;
    }): Promise<{
        rows: Brand[];
        count: number;
    }>;
}
