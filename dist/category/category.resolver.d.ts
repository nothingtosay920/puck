import { CreateCategoryInput } from './category.input';
import { CategoryService } from './category.service';
export declare class CategoryResolver {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategorys(): Promise<{
        labels: {
            category: string;
            description: string;
            name: string;
            label_id: string;
        }[];
        description: string;
        category_id: string;
        name: string;
    }[]>;
    createCategory(data: CreateCategoryInput): Promise<import(".prisma/client").Category>;
}
