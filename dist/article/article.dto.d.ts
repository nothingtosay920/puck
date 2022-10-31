import { ArticleType } from "@prisma/client";
import { Label } from "src/label/label.dto";
import { UserData } from "src/users/users.dto";
export declare class BeFollowed {
}
export declare class Draft {
}
export declare class DraftRes {
    data: Draft[];
    next: number;
}
export declare class Collection {
}
export declare class Zan {
}
export declare class Category {
}
export declare class GatherRes {
}
export declare class ArticleData {
    zan_status: boolean;
    collection_status: boolean;
    follow_status: boolean;
    follow_user: boolean;
    zan: Zan[];
    beFollowed: BeFollowed[];
    collection: Collection[];
    draft: Draft[];
    labels: Label[];
    categorys: Category[];
    gather: GatherRes;
}
export declare class RecordsArticleData {
    timestamp: string;
    zan: Zan[];
}
export declare class RecordsDataPagenation {
    data: RecordsArticleData[];
    next: number;
}
export declare class ArticleDataPagenation {
    data: ArticleData[];
    next: number;
}
export declare class DynamicRes extends ArticleData {
    data: ArticleData[];
    next: number;
}
export declare class GatherData {
}
export declare class AllArticlesInfo {
    author: UserData;
}
export declare class AllArticlesPagenation {
    data: AllArticlesInfo[];
    next: number;
}
export declare class AllGatherPagenation {
    data: GatherData[];
    next: number;
}
export declare class WritingArticle {
    type: ArticleType;
    gather_id: string;
    gather_name: string;
    gather_img: string;
    category: string;
    article_description: string;
    labels: string[];
    article_data: ArticleData[];
}
export declare class ArticlePanelStatus {
}
