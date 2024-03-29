import { Injectable, Inject } from '@nestjs/common';
import WaitList from '../entities/waitlist.entity';

@Injectable()
export default class WaitListRepository {
  constructor(
    @Inject('WAITLIST_ENTITY')
    private readonly waitListEntity: typeof WaitList,
  ) {}
  async create(payload, transaction): Promise<[WaitList, boolean]> {
    return this.waitListEntity.findOrCreate<WaitList>({
      where: {
        email: payload.email,
      },
      defaults: payload,
      transaction: await transaction,
      raw: true,
    });
  }

  find(criteria): Promise<{ rows: WaitList[]; count: number }> {
    return this.waitListEntity.findAndCountAll<WaitList>({
      where: criteria,
    });
  }
}
