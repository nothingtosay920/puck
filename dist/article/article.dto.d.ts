import { MusterType } from "@prisma/client";
export declare type ArtiType = 'GATHER' | 'SOLO';
export declare type ArticleType = 'GATHER' | 'MUSTER';
export declare class LabelDto {
    label: string;
    name: string;
    description: string;
}
export declare class MusterArticleDTO {
    description: string;
    article: string;
}
export declare class GatherArticle {
    title: string;
    outer_id: string;
    article: string;
    article_type: string;
}
export declare class ArticleDTO {
    article: string;
    description: string;
    muster: string;
    title: string;
    id: string;
    article_img: string;
    type: string;
    edit_time: string;
    author: string;
    gather: string;
    labels: string[];
    categorys: string;
    zan: string;
    hot: string;
    outer_id: string;
    befollowed: number;
    zan_status: Boolean;
    follow_status: Boolean;
    collection_status: Boolean;
    author_img: string;
    author_name: string;
    timestamp: string;
}
export declare class RecordsRes {
    article_data: ArticleDTO[];
    next: number;
}
export declare class Befollowed {
    user_id: string;
    gather_article_id: string;
}
export declare class Polymerization {
    author: string;
    author_name: string;
    muster_id: string;
    gather_id: string;
    muster_img: string;
    article_data: number;
    name: string;
    type: MusterType;
    description: string;
    article_id: string;
}
export declare class DynamicRes {
    description: string;
    title: string;
    id: string;
    article_img: string;
    acticle_type: string;
    edit_time: string;
    author: string;
    zan: string;
    hot: string;
    outer_id: string;
    author_img: string;
    author_name: string;
    name: string;
    user_img: string;
    open_id: string;
    zan_status: Boolean;
    follow_status: Boolean;
    collection_status: Boolean;
    labels: string[];
    categorys: string;
    type: string;
}
export declare class DraftArticle {
    labels: string[];
    categorys: string;
    description: string;
    gather_id: string;
    article_data: ArticleDTO;
    title: string;
    article: string;
    article_img: string;
    type: string;
    muster: string;
    id: string;
}
export declare class WritingList {
    muster_data: ArticleIdDto[];
    gather_data: ArticleIdDto[];
}
declare class OuterId {
    outer_id: string;
}
declare class ArticleIdDto {
    article_data: OuterId[];
}
export declare class collectionList {
    list: collection[];
}
declare class collection {
    title: string;
    hot: string;
    zan: string;
    edit_time: string;
}
export declare class collectionArticleRes {
    list: ArticleDTO[];
    next: number;
    count: number;
}
declare class LabelTypeInArticle {
    label_id: string;
    name: string;
    description: string;
}
declare class Labels {
    Labels: LabelTypeInArticle;
}
export declare class AllArticles {
    title: string;
    zan: string;
    hot: string;
    outer_id: string;
    article_img: string;
    article_type: string;
    description: string;
    edit_time: string;
    labels: Labels[];
}
export declare class AllArticlesRes {
    next: number;
    count: number;
    AllArticles: AllArticles[];
}
export declare class AddArticleRes {
    article_id: string;
}
declare class AuthorInfo extends OuterId {
    uuid_user: string;
    name: string;
    user_img: string;
}
export declare class MusterArticleById {
    muster_img: string;
    name: string;
    author: AuthorInfo;
    article_data: ArticleDTO[];
    description: string;
}
export declare class MusterColumn {
    name: string;
    description: string;
    type: 'MUSTER';
    muster_id: string;
    muster_img: string;
    authorId: string;
}
export {};
