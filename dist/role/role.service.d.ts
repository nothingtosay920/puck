import { AppService } from 'src/app.service';
export declare class RoleService {
    private prisma;
    constructor(prisma: AppService);
    findOne(id: string): import(".prisma/client").Prisma.Prisma__RoleClient<import(".prisma/client").Role>;
    remove(id: number): string;
}
