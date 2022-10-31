import { ArticleType } from "@prisma/client";
import { Label } from "src/label/label.dto";
import { UserData } from "src/users/users.dto";
import { ArticleData } from "./article.dto";
export declare class GatherInter {
    gather_name: string;
    article_description: string;
    type: ArticleType;
    gather_id: string;
    gather_img: string;
    authorId: string;
    articles: ArticleData[];
    article_type: ArticleType;
    author: UserData;
}
export declare class ArticleInter {
    id: number;
    title: string;
    outer_id: string;
    article: string;
    description: string;
    hot: number;
    gather_id: string;
    article_img: string;
    article_type: ArticleType;
    edit_time: string;
    release: boolean;
    author: UserData;
}
export declare class BeFollowedInter {
    article_id: string;
    user_id: string;
}
export declare class ZanInter {
    article_id: string;
    authorId: string;
}
export declare class DraftInter {
    article_id: string;
    time_stmap: string;
    user_id: string;
}
export declare class CollectionInter {
    collection_id: number;
    article_id: string;
    user_id: string;
}
export declare class CategoryInter {
    name: string;
    description: string;
    category_id: string;
    labels: Label[];
}
export declare class ArticleStatusInterface {
    author: string;
    author_img: string;
    author_name: string;
}
declare class ParalArticleInfo {
}
export declare class GatherResInterface {
    articles: ParalArticleInfo[];
    gather_id: string;
    gather_name: string;
    article_type: string;
}
export declare class ArticlePanelStatusInter {
    zan_status: boolean;
    collect_status: boolean;
    follow_status: boolean;
}
export {};
