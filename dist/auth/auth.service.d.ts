import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
export declare type IContext = {
    req: Request;
    res: Response;
};
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    Login(phone: string, context: IContext): Promise<{
        code: string;
        message: string;
    }>;
    getUserData(context: IContext): Promise<{
        data: {
            name: string;
        };
    }>;
}
