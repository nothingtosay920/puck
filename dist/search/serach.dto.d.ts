import { ArticleType } from "@prisma/client";
export declare class IndexData {
    id: string;
    type: ArticleType;
    category: string;
    labels: string[];
    title: string;
}
export declare class IndexQuery {
    title: string;
}
