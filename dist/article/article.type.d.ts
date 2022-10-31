import { Article } from "@prisma/client";
declare type ArticleInfo = {
    zan_status: boolean;
    follow_status: boolean;
    collection_status: boolean;
    follow_user?: boolean;
};
declare type UserInfo = {
    author: {
        name: string;
        uuid: string;
        user_img: string;
    };
};
export declare type GatherRes = {
    gather: {
        articles: {
            outer_id: string;
            title: string;
        }[];
        gather_id: string;
        gather_name: string;
    };
    article_type: string;
};
export declare type ArticleDataType = Article & ArticleInfo & UserInfo;
export {};
