import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import Brand from '../entities/brand.entity';

@Injectable()
export default class BrandRepository {
  constructor(
    @Inject('BRAND_ENTITY')
    private readonly brandEntity: typeof Brand,
  ) {}
  create(payload): Promise<[Brand, boolean]> {
    return this.brandEntity.findOrCreate<Brand>({
      where: {
        name: payload.name,
      },
      defaults: payload,
      raw: true,
    });
  }

  find({ 
    limit, 
    offset, 
    ...criteria
  }) {    
    return this.brandEntity.findAndCountAll<Brand>({
      where: criteria,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit) || 10,
      offset: parseInt(offset) || 0
    });
  }
}
