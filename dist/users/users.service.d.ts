import { ElasticsearchService } from '@nestjs/elasticsearch';
import { DynamicType, Gather, Prisma, User } from '@prisma/client';
import { AppService } from 'src/app.service';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';
import { RecommendItemService } from 'src/recommend/item/item.service';
import { GatherInput, SavedArticleInput } from './users.input';
export declare class UsersService {
    private prisma;
    private ItemService;
    private categoryService;
    private labelService;
    private elasticsearchService;
    constructor(prisma: AppService, ItemService: RecommendItemService, categoryService: CategoryService, labelService: LabelService, elasticsearchService: ElasticsearchService);
    getUserFollow(uuid: string): Promise<{
        follow: {
            follow_id: string;
        }[];
    }>;
    findArticleCollect(outer_id: string, uuid: string): Promise<{
        collection: import(".prisma/client").Collection[];
    }>;
    userBeFollowed(uid: string): Promise<{
        info: {
            uuid: string;
        }[];
    }>;
    addInfo(uid: string, info_id: string): Promise<User>;
    getMessage(uuid: string, page: number): Promise<import(".prisma/client").Info & {
        message: (import(".prisma/client").MessageData & {
            info: {
                reading_time: string;
            };
        })[];
    }>;
    findZan(uuid: string, article_id: string): Promise<{
        zan: import(".prisma/client").Zan[];
    }>;
    saveArticle(article: SavedArticleInput, uid: string): Promise<number>;
    createArticle(article: SavedArticleInput, uid: string): Promise<{
        article_id: string;
    }>;
    collectionArticle(uid: string, id: string): Promise<void>;
    addDynamic(uid: string, content: string, type: DynamicType): Promise<User>;
    followUser(uid: string, follow_id: string): Promise<User>;
    collection(uid: string, article_id: string, type?: DynamicType): Promise<User>;
    removeCollect(uuid: string, article_id: string): Promise<User>;
    getAllArticles(uid: string, page?: number): Promise<(Gather & {
        articles: (import(".prisma/client").Article & {
            info: import(".prisma/client").Info[];
            categorys: import(".prisma/client").Category[];
            zan: import(".prisma/client").Zan[];
            labels: import(".prisma/client").Label[];
        })[];
        author: User;
    })[]>;
    getAllGatherArticlesPagenation(uid: string): Promise<{
        articles: Gather[];
    }>;
    getAllColumnArtilcesPagenation(uid: string, page: number): Promise<{
        articles: Gather[];
    }>;
    addRecords(uid: string, article_id: string): Promise<User>;
    getFollowUserStatus(uid: string, follow_id: string): Promise<{
        follow: import(".prisma/client").Follow[];
    }>;
    addZan(uid: string, article_id: string): Promise<User>;
    removeZan(uuid: string, id: string): Promise<User>;
    getRecords(page: number, uid: string): Promise<{
        record: {
            article_id: string;
            timestamp: string;
        }[];
    }>;
    getDynamic(uid: string, page: number): Promise<{
        dynamic: import(".prisma/client").Dynamic[];
    }>;
    findOne(id: string): Promise<User>;
    findOneByPhone(phone: string): Prisma.Prisma__UserClient<User>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    getDraft(uid: string, page: number): Promise<User & {
        draft: import(".prisma/client").Draft[];
    }>;
    getUserSaved(uid: string): Promise<{
        collection: import(".prisma/client").Collection[];
    }>;
    collectArticle(uid: string, id: string): Promise<User>;
    getUserInfo(uid: string): Promise<User & {
        zan: import(".prisma/client").Zan[];
        reading: import(".prisma/client").Reading[];
    }>;
    getWritingArticle(uid: string): Promise<{
        articles: {
            articles: {
                outer_id: string;
            }[];
        }[];
    }>;
    getBaseMusterInfo(uid: string): Promise<{
        articles: {
            articles: {
                outer_id: string;
            }[];
            gather_name: string;
            article_description: string;
            article_type: import(".prisma/client").ArticleType;
            gather_id: string;
            gather_img: string;
        }[];
    }>;
    getSingleInfo(uid: string): Promise<{
        articles: {
            articles: (import(".prisma/client").Article & {
                info: import(".prisma/client").Info[];
                collection: import(".prisma/client").Collection[];
                categorys: import(".prisma/client").Category[];
                zan: import(".prisma/client").Zan[];
                labels: import(".prisma/client").Label[];
            })[];
            article_type: import(".prisma/client").ArticleType;
        }[];
    }>;
    getColletionArticles(uid: string, page?: number): Promise<{
        collection: {
            article_id: string;
        }[];
    }>;
    getArticleByGatherId(id: string): Promise<{
        articles: import(".prisma/client").Article[];
        gather_name: string;
        article_description: string;
        gather_img: string;
        author: {
            uuid: string;
            name: string;
            user_img: string;
        };
    }>;
    createColumn(data: GatherInput, uid: string): Promise<User>;
    getColumn(uid: string): Promise<{
        articles: (Gather & {
            articles: import(".prisma/client").Article[];
        })[];
    }>;
    getColumnArticle(gather_id: string): Promise<Gather & {
        articles: (import(".prisma/client").Article & {
            categorys: import(".prisma/client").Category[];
            zan: import(".prisma/client").Zan[];
            labels: import(".prisma/client").Label[];
        })[];
        author: User;
    }>;
    getArticlesInfo(uid: string): Promise<{
        articles: {
            articles: {
                zan: import(".prisma/client").Zan[];
                hot: number;
            }[];
        }[];
    }>;
    getLastetRecords(uid: string): Promise<{
        record: {
            article_id: string;
        }[];
    }>;
}
