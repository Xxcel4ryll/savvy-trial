/// <reference types="passport" />
/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/index';
import { Request } from 'express';
import { ProductDto } from 'src/Products/dtos';
import { FindDataRequestDto } from 'src/dto/request/find.data.request.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(req: Request): Express.User;
    updateUser(req: Request, files: {
        bvn?: Express.Multer.File[];
        id?: Express.Multer.File[];
    }, updateInfo: UserDto): Promise<{
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
    getUsers({ type }: {
        type: any;
    }): Promise<{
        rows: import("../entities/user.entity").default[];
        count: number;
    }>;
    createAdminUser(admin: UserDto): Promise<import("../entities/user.entity").default>;
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
    getAllUsers(query: FindDataRequestDto): Promise<{
        status: HttpStatus;
        message: string;
        data: any;
        meta: {
            total_items: number;
            total_pages: number;
            current_page: number;
        };
    }>;
    getAllKYCUsers(query: FindDataRequestDto): Promise<{
        status: HttpStatus;
        message: string;
        data: any;
        meta: {
            total_items: number;
            total_pages: number;
            current_page: number;
        };
    }>;
}
