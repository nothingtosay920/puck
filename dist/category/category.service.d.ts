import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: AppService);
    getCategory(): Promise<{
        description: string;
        labels: {
            description: string;
            category: string;
            name: string;
            label_id: string;
        }[];
        name: string;
        category_id: string;
    }[]>;
    findCategoryById(id: string): Promise<import(".prisma/client").Category>;
    createUserCategory(data: Prisma.CategoryCreateInput): Promise<import(".prisma/client").Category>;
    testChange(id: string, d: string): Promise<import(".prisma/client").Category>;
    putCategory(id: string, desc: string): Promise<import(".prisma/client").Category>;
}
