import { JwtService } from '@nestjs/jwt';
import { ArticleType, DynamicType, Gather, User } from '@prisma/client';
import { IContext } from 'src/auth/auth.service';
import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { RecommendItemService } from 'src/recommend/item/item.service';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { SearchService } from 'src/search/search.service';
import { UsersService } from 'src/users/users.service';
import { ArticleService } from './article.service';
import { ArticleDataType, GatherRes } from './article.type';
export declare class ArticleResolver {
    private readonly articleService;
    private readonly feedbackService;
    private readonly userSerivce;
    private jwtService;
    private recommendItemService;
    private searchService;
    private rcommendUserService;
    constructor(articleService: ArticleService, feedbackService: FeedbackService, userSerivce: UsersService, jwtService: JwtService, recommendItemService: RecommendItemService, searchService: SearchService, rcommendUserService: RcommendUserService);
    getArticleById(id: string, token: string): Promise<ArticleDataType & GatherRes>;
    insertFeeback(id: string, vid: string): Promise<number>;
    getArticleByIdNotFB(id: string, context: IContext): Promise<ArticleDataType & GatherRes>;
    removeArticleById(id: string): Promise<number>;
    getRecords(page: number, context: IContext): Promise<{
        data: Promise<{
            timestamp: string;
            id: number;
            title: string;
            outer_id: string;
            article: string;
            description: string;
            hot: number;
            gather_id: string;
            article_img: string;
            edit_time: string;
            release: boolean;
            zan_status: boolean;
            follow_status: boolean;
            collection_status: boolean;
            follow_user?: boolean;
            author: {
                name: string;
                uuid: string;
                user_img: string;
            };
            gather: {
                articles: {
                    outer_id: string;
                    title: string;
                }[];
                gather_id: string;
                gather_name: string;
            };
            article_type: string;
        }>[];
        next: number;
    }>;
    Search(query: string, page: number): Promise<{
        data: Promise<{
            gather: {
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
                article_type: ArticleType;
                author: User;
                gather_img: string;
                article_description: string;
            };
            author: {
                name: string;
                uuid: string;
                user_img: string;
            };
            article_type: ArticleType;
            id: number;
            title: string;
            outer_id: string;
            article: string;
            description: string;
            hot: number;
            gather_id: string;
            article_img: string;
            edit_time: string;
            release: boolean;
            info: import(".prisma/client").Info[];
            zan: import(".prisma/client").Zan[];
            labels: import(".prisma/client").Label[];
            categorys: import(".prisma/client").Category[];
            collection: import(".prisma/client").Collection[];
        }>[];
        next: number;
    }>;
    SearchAuthorArticle(query: string, author_id: string, page: number): Promise<{
        data: (Gather & {
            articles: (import(".prisma/client").Article & {
                info: import(".prisma/client").Info[];
                zan: import(".prisma/client").Zan[];
                labels: import(".prisma/client").Label[];
                categorys: import(".prisma/client").Category[];
            })[];
            author: User;
        })[];
        next: number;
    }>;
    SearchAllArticle(query: string, page: number, context: IContext): Promise<{
        data: {
            articles: import(".prisma/client").Article[];
        }[];
        next: number;
    }>;
    getUserSavedApi(context: IContext): Promise<{
        data: Promise<import(".prisma/client").Article & {
            info: import(".prisma/client").Info[];
            zan: import(".prisma/client").Zan[];
            labels: import(".prisma/client").Label[];
            categorys: import(".prisma/client").Category[];
            collection: import(".prisma/client").Collection[];
        }>[];
    }>;
    collectArticle(id: string, context: IContext): Promise<number>;
    dynamicApi(content: string, type: DynamicType, context: IContext): Promise<(import(".prisma/client").Article & {
        zan_status: boolean;
        follow_status: boolean;
        collection_status: boolean;
        follow_user?: boolean;
    } & {
        author: {
            name: string;
            uuid: string;
            user_img: string;
        };
    } & GatherRes) | {
        author: User;
    }>;
    getDraft(page: number, context: IContext): Promise<{
        data: Promise<import(".prisma/client").Article & {
            zan_status: boolean;
            follow_status: boolean;
            collection_status: boolean;
            follow_user?: boolean;
        } & {
            author: {
                name: string;
                uuid: string;
                user_img: string;
            };
        } & GatherRes>[];
        next: number;
    }>;
    getCollectionArticles(page: number, context: IContext): Promise<{
        data: Promise<import(".prisma/client").Article & {
            zan_status: boolean;
            follow_status: boolean;
            collection_status: boolean;
            follow_user?: boolean;
        } & {
            author: {
                name: string;
                uuid: string;
                user_img: string;
            };
        } & GatherRes>[];
        next: number;
    }>;
    indexPanelArticle(context: IContext): Promise<number>;
    getArticleNeighbors(id: string): Promise<number>;
    followArticle(id: string, context: IContext): Promise<number>;
    getUserMessage(page: number, context: IContext): Promise<{
        data: (import(".prisma/client").MessageData & {
            info: {
                reading_time: string;
            };
        })[];
        next: number;
    }>;
    getWritingArticle(id: string): Promise<{
        type: ArticleType;
        article_data: {
            title: string;
            outer_id: string;
            article: string;
            description: string;
            article_img: string;
            edit_time: string;
        }[];
        gather_id: string;
        gather_name: string;
        gather_img: string;
        category: string;
        labels: string[];
        article_description: string;
    }>;
    getArticlePanelStatus(article_id: string, context: IContext): Promise<{
        zan_status: boolean;
        collect_status: boolean;
        follow_status: boolean;
    }>;
}
