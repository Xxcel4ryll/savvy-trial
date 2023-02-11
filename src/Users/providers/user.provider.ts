import Users from '../entities/user.entity';
import UserFavourites from '../entities/user_favourite.entity';

export const UserProviders = [
  {
    provide: 'USER_ENTITY',
    useValue: Users,
  },
  {
    provide: 'USER_FAVOURITES_ENTITY',
    useValue: UserFavourites,
  },
];
