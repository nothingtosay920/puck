import { musterInput } from 'src/users/users.input';
import { UsersService } from 'src/users/users.service';
import { AuthService, IContext } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    Login(phone: string, context: IContext): Promise<{
        code: string;
        message: string;
    }>;
    Test(): string;
    createMusterArticle(mArticle: musterInput, context: IContext): Promise<{
        name: string;
    }>;
    getUserData(context: IContext): Promise<{
        data: {
            name: string;
        };
    }>;
}
