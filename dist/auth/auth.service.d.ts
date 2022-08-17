import { Request, Response } from 'express';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { UsersService } from '../users/users.service';
export declare type IContext = {
    req: Request;
    res: Response;
};
export declare class AuthService {
    private readonly usersService;
    private readonly recommendUserService;
    constructor(usersService: UsersService, recommendUserService: RcommendUserService);
    Login(phone: string, context: IContext): Promise<{
        code: string;
        message: string;
    }>;
    LogOut(context: IContext): Promise<{
        code: number;
    }>;
    getUserData(context: IContext): Promise<{}>;
}
