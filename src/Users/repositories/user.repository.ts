import { Injectable, Inject } from '@nestjs/common';
import Users from '../entities/user.entity';

@Injectable()
export default class UserRepository {
  constructor(
    @Inject('USER_ENTITY')
    private readonly userEntity: typeof Users,
  ) {}

  findByEmail(email): Promise<Users> {
    return this.userEntity.findOne<Users>({
      where: {
        email,
      },
    });
  }

  findByPhone(phoneNumber): Promise<Users> {
    return this.userEntity.findOne<Users>({
      where: {
        phoneNumber,
      },
    });
  }

  findById(id): Promise<Users> {
    return this.userEntity.findOne<Users>({
      where: {
        id,
      },
    });
  }

  create(payload) {
    return this.userEntity.findOrCreate<Users>({
      where: {
        email: payload.email,
      },
      defaults: payload,
      raw: true,
    });
  }

  modify(criteriaObj, updates) {
    console.log(updates);
    console.log(criteriaObj);
    
    return this.userEntity.update<Users>(updates, {
      where: criteriaObj,
    });
  }
}
