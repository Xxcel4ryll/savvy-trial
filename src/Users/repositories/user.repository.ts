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
      }
    });
  }

  findByPhone(phoneNumber): Promise<Users> {
    return this.userEntity.findOne<Users>({
      where: {
        phoneNumber,
      },
      attributes: [
        'id',
        'firstName',
        'lastName',
        'phoneNumber',
        'password',
        'userType',
        'role',
        'profilePicture',
      ]
    });
  }

  findById(id): Promise<Users> {
    return this.userEntity.findOne<Users>({
      where: {
        id,
      },
      // attributes: [
      //   'id',
      //   'firstName',
      //   'lastName',
      //   'password',
      //   'phoneNumber',
      //   'role',
      //   'userType',
      //   'profilePicture',
      // ]
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
    
    return this.userEntity.update<Users>(updates, {
      where: criteriaObj,
    });
  }
}
