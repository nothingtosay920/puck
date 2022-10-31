import { ArticleType } from "@prisma/client";
export declare class UserData {
}
export declare class UsersDATA {
    name: string;
    user_img: string;
    uuid: string;
}
export declare class Dynamic {
    content: string;
    type: string;
    time_tamp: string;
    dynamic_id: string;
}
export declare class DynamicApiRes {
    dynamic: Dynamic[];
    next: number;
    count: number;
}
export declare class BaseUserInfo {
    user_img: string;
    name: string;
}
export declare class BaseMusterInfo {
    data: BaseMusterData[];
    next: number;
}
export declare class BaseMusterArticle {
    outer_id: string;
}
export declare class BaseMusterData {
    gather_name: string;
    gather_id: string;
    gather_img: string;
    article_description: string;
    article_type: string;
    articles: BaseMusterArticle[];
}
export declare class InfoReadData {
}
export declare class MessageData {
    timestamp: string;
    title: string;
    article_id: string;
    article_type: ArticleType;
    info: InfoReadData;
}
export declare class MessageDataRes {
    data: MessageData[];
    next: number;
}
