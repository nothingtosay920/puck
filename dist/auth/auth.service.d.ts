import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { InfoService } from 'src/info/info.service';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { UsersService } from '../users/users.service';
export declare type IContext = {
    req: Request;
    res: Response;
};
export declare class AuthService {
    private readonly usersService;
    private readonly recommendUserService;
    private jwtService;
    private infoService;
    constructor(usersService: UsersService, recommendUserService: RcommendUserService, jwtService: JwtService, infoService: InfoService);
    Login(phone: string, context: IContext): Promise<any>;
    LogOut(context: IContext): Promise<{
        code: number;
    }>;
    getUserData(uid: string): Promise<import(".prisma/client").User>;
    getUserFollow(uid: string): Promise<{
        follow_id: string;
    }[]>;
}
