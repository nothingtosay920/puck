import { ArticleData } from "src/article/article.dto";
export declare class RecommendItem {
    Id: string;
    Score: number;
}
export declare class RecommendRes {
    data: ArticleData[];
    next: Number;
}
export declare class RelateRecommendRes {
    data: String[];
    next: Number;
}
