import { Injectable, Inject } from '@nestjs/common';
import Paystack from '../entities/paystack.entity';

@Injectable()
export default class PaystackRepository {
  constructor(
    @Inject('PAYSTACK_ENTITY')
    private readonly paystackEntity: typeof Paystack,
  ) {}

  find(id): Promise<Paystack> {
    return this.paystackEntity.findOne<Paystack>({
      where: {
        id,
      },
    });
  }

  create(payload) {
    return this.paystackEntity.findOrCreate<Paystack>({
      where: {
        customerCode: payload.customerCode,
        userId: payload.userId,
      },
      defaults: {
        customerCode: payload.customerCode,
        userId: payload.userId,
      },
      raw: true,
    });
  }
}
