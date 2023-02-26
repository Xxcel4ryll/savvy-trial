/// <reference types="passport" />
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/index';
import { Request } from 'express';
import { ProductDto } from 'src/Products/dtos';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(req: Request): Express.User;
    updateUser(req: Request, updateInfo: UserDto): Promise<{
        message: string;
    }>;
    updateUserImage(req: Request, updateInfo: UserDto): Promise<{
        message: string;
    }>;
    favoriteProduct({ user }: Request, { productId }: ProductDto): Promise<import("../entities/user_favourite.entity").default>;
    viewFavoriteProduct({ user }: Request): Promise<{
        rows: import("../entities/user_favourite.entity").default[];
        count: number;
    }>;
}
