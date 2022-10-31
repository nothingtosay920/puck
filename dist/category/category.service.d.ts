import { Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: AppService);
    getCategory(): Promise<{
        name: string;
        labels: {
            name: string;
            label_id: string;
            description: string;
            category: string;
        }[];
        description: string;
        category_id: string;
    }[]>;
    findCategoryById(id: string): Promise<import(".prisma/client").Category>;
    createUserCategory(data: Prisma.CategoryCreateInput): Promise<import(".prisma/client").Category>;
    testChange(id: string, d: string): Promise<import(".prisma/client").Category>;
    putCategory(id: string, desc: string): Promise<import(".prisma/client").Category>;
}
