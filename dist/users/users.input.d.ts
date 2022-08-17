export declare class UsersInput {
    readonly phone: string;
}
export declare class MusterArticle {
    title: string;
    description: string;
    article: string;
    articleImg: string;
}
export declare class LabelType {
    label: string;
}
export declare class MusterInput {
    article_data: MusterArticle;
    category: string;
    labels: LabelType[];
    muster_id: string;
    name?: string;
    muster_article_id: string;
    muster_img: string;
    muster_desc: string;
}
export declare class GatherArticle {
    title: string;
    article: string;
    article_img: string;
}
export declare class GatherInput {
    article_data: GatherArticle[];
    category: string;
    labels: LabelType[];
    description: string;
    gather_id: string;
    gather_article_id: string;
    gather_img: string;
}
