import Users from '../entities/user.entity';

export const UserProviders = [
  {
    provide: 'USER_ENTITY',
    useValue: Users,
  },
];
