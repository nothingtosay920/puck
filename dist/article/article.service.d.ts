import { AppService } from 'src/app.service';
export declare class ArticleService {
    private prisma;
    constructor(prisma: AppService);
    findArticleFollow(outer_id: string, uuid: string): Promise<{
        info: import(".prisma/client").Info[];
    }>;
    remoceArticleFollow(outer_id: string, uuid: string): Promise<import(".prisma/client").Article>;
    getArticle(id: string): Promise<import(".prisma/client").Article & {
        info: import(".prisma/client").Info[];
        zan: import(".prisma/client").Zan[];
        labels: import(".prisma/client").Label[];
        categorys: import(".prisma/client").Category[];
        collection: import(".prisma/client").Collection[];
    }>;
    getGather(gather_id: string): Promise<{
        gather_id: string;
        articles: {
            title: string;
            outer_id: string;
            article: string;
            description: string;
            article_img: string;
            edit_time: string;
        }[];
        gather_name: string;
        article_type: import(".prisma/client").ArticleType;
        author: import(".prisma/client").User;
        gather_img: string;
        article_description: string;
    }>;
    removeArticleById(id: string): Promise<import(".prisma/client").Article>;
    searchAllArticle(query: string, uid: string): Promise<{
        articles: {
            articles: import(".prisma/client").Article[];
        }[];
    }>;
    searchGatherArticle(query: string, uid: string): Promise<{
        articles: {
            articles: import(".prisma/client").Article[];
        }[];
    }>;
    searchColumnArticle(query: string, uid: string): Promise<{
        articles: {
            articles: import(".prisma/client").Article[];
        }[];
    }>;
    searchAuthorArticle(query: string, uid: string, page: number): Promise<(import(".prisma/client").Gather & {
        articles: (import(".prisma/client").Article & {
            info: import(".prisma/client").Info[];
            zan: import(".prisma/client").Zan[];
            labels: import(".prisma/client").Label[];
            categorys: import(".prisma/client").Category[];
        })[];
        author: import(".prisma/client").User;
    })[]>;
    artilceBeFollowed(uid: string, id: string): Promise<import(".prisma/client").Article>;
    getGatherById(id: string): Promise<import(".prisma/client").Gather & {
        articles: (import(".prisma/client").Article & {
            labels: import(".prisma/client").Label[];
            categorys: import(".prisma/client").Category[];
        })[];
    }>;
    getArticlePanelStatus(uuid: string, article_id: string): Promise<{
        zan: import(".prisma/client").Zan[];
        collection: import(".prisma/client").Collection[];
        follow: import(".prisma/client").Follow[];
    }>;
}
