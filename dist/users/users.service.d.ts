import { Prisma, User } from '@prisma/client';
import { AppService } from 'src/app.service';
import { IContext } from 'src/auth/auth.service';
import { musterInput } from './users.input';
export declare class UsersService {
    private prisma;
    constructor(prisma: AppService);
    getUser(): import(".prisma/client").PrismaPromise<User[]>;
    createMusterArticle(article: musterInput, context: IContext): Promise<{
        name: string;
    }>;
    findOne(id: string): Prisma.Prisma__UserClient<User>;
    findOneByPhone(phone: string): Prisma.Prisma__UserClient<User>;
    create(data: Prisma.UserCreateInput): Prisma.Prisma__UserClient<User>;
}
