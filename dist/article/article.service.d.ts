import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';
export declare class ArticleService {
    private prisma;
    constructor(prisma: AppService);
    createGather(data: Prisma.GatherCreateInput): Prisma.Prisma__GatherClient<import(".prisma/client").Gather>;
}
