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
    updateUserProfile(req: Request, updateInfo: UserDto): Promise<{
        message: string;
    }>;
    updatePassword(req: Request, passwordInfo: UserDto): Promise<{
        message: string;
    }>;
    updateUserImage(req: Request, file: any): Promise<{
        message: string;
    }>;
    favoriteProduct({ user }: Request, { productId }: ProductDto): Promise<import("../entities/user_favourite.entity").default>;
    viewFavoriteProduct({ user }: Request): Promise<{
        rows: import("../entities/user_favourite.entity").default[];
        count: number;
    }>;
    removeFavoriteProduct({ user }: Request, { productId }: ProductDto): Promise<string>;
    deleteAdmin({ userId }: {
        userId: any;
    }): Promise<{
        message: string;
    }>;
    updateAdminStatus({ userId, status }: {
        userId: any;
        status: any;
    }): Promise<{
        message: string;
    }>;
}
