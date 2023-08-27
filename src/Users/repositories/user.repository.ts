import { Injectable, Inject } from '@nestjs/common';
import { Op, Sequelize } from 'sequelize';
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
      defaults: {
        ...payload,
        status: payload.userType === 'ADMIN' ?
        'PENDING' : 'VERIFIED'
      },
      raw: true,
    });
  }

  modify(criteriaObj, updates) {
    return this.userEntity.update<Users>(updates, {
      where: criteriaObj,
    });
  }

  getUsers(type) {

    return this.userEntity.findAndCountAll<Users>({
      where: Sequelize.literal(`LOWER(user_type) LIKE LOWER('%${type}%')`),
      attributes: [
      'id',
      'email',
      'firstName',
      'lastName',
      'phoneNumber',
      'profile_picture',
      'countryCode',
      'profilePicture',
      'userType',
      'status',
      'createdAt'
    ]
    });
  }

  fetchAlUsers(meta, type?:string): Promise<{ rows:Users[], count: number}> {    
    let where;
    type == null ? where = {
      userType:{
        [Op.like]: 'USER'
      },
      } : where = {
        userType:{
          [Op.like]: 'USER'
        },
        status: {
          [Op.like]: type
        }
        }
    return this.userEntity.findAndCountAll<Users>({
      where: where,
      attributes: [
        'id',
        'user_id',
        'email',
        'firstName',
        'lastName',
        'phoneNumber',
        'countryCode',
        'profilePicture',
        'userType',
        'status',
        'createdAt',
        'updated_at'
      ],
      ...meta,
    });
  }

  fetchKycUsers(meta): Promise<{ rows:Users[], count: number}> { 
    const excludedStatuses = ['VERIFIED', 'SUSPENDED'];   
    return this.userEntity.findAndCountAll<Users>({
      where: {
        status: {
          [Op.notIn]: excludedStatuses
        },
      },
      attributes: [
        'id',
        'user_id',
        'bvn',
        'email',
        'firstName',
        'lastName',
        'phoneNumber',
        'countryCode',
        'profilePicture',
        'userType',
        'status',
        'createdAt',
        'updated_at'
      ],
      ...meta,
    });
  }
  

  delete(criteriaObj) {
    return this.userEntity.destroy<Users>({
      where: criteriaObj,
    });
  }
}
