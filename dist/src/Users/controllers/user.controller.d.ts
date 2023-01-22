/// <reference types="passport" />
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/index';
import { Request } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(req: Request): Express.User;
    updateUser(req: Request, updateInfo: UserDto): Promise<{
        message: string;
    }>;
}
