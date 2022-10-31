import { ArticleType } from "@prisma/client";
export declare class UsersInput {
    readonly phone: string;
}
export declare class GatherInput {
    gather_name: string;
    article_description: string;
    gather_img: string;
}
export declare class ArticleInput {
    title: string;
    outer_id: string;
    article: string;
    article_img: string;
    edit_time: string;
    description: string;
}
export declare class SavedArticleInput {
    gather_name: string;
    article_type: ArticleType;
    article_description: string;
    gather_img: string;
    article_data: ArticleInput[];
    labels: string[];
    gather_id: string;
    category: string;
}
export declare class LabelType {
    label: string;
}
