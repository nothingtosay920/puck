import { CreateCategoryInput } from './category.input';
import { CategoryService } from './category.service';
export declare class CategoryResolver {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategorys(): Promise<{
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
    createCategory(data: CreateCategoryInput): Promise<import(".prisma/client").Category>;
}
