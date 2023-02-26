import Users from '../entities/user.entity';
import UserFavourites from '../entities/user_favourite.entity';
export declare const UserProviders: ({
    provide: string;
    useValue: typeof Users;
} | {
    provide: string;
    useValue: typeof UserFavourites;
})[];
