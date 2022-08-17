import { DynamicType, Prisma, User } from '@prisma/client';
import { AppService } from 'src/app.service';
import { CMuster } from 'src/article/article.input';
import { IContext } from 'src/auth/auth.service';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';
import { RecommendItemService } from 'src/recommend/item/item.service';
import { GatherInput, MusterInput } from './users.input';
export declare class UsersService {
    private prisma;
    private ItemService;
    private categoryService;
    private labelService;
    constructor(prisma: AppService, ItemService: RecommendItemService, categoryService: CategoryService, labelService: LabelService);
    saveMusterArticle(article: MusterInput, context: IContext): Promise<string>;
    savedGather(article: GatherInput, context: IContext): Promise<number>;
    createMuster(article: MusterInput, uid: string): Promise<{
        article_id: string;
    }>;
    savedMuster(article: MusterInput, uid: string): Promise<number>;
    createGather(article: GatherInput, context: IContext): Promise<{
        article: string;
    }>;
    collectionArticle(uid: string, id: string): Promise<void>;
    addDynamic(uid: string, content: string, type: DynamicType): Promise<User>;
    followUser(uid: string, follow_id: string): Promise<User>;
    beFollowUser(uid: string, be_followed: string): Promise<User>;
    collection(uid: string, article_id: string, dynamicContent: string, type?: DynamicType): Promise<User>;
    getAllMusterArticles(uid: string, page?: number): Promise<{
        name: string;
        description: string;
        type: import(".prisma/client").MusterType;
        muster_id: string;
        muster_img: string;
        article_data: import(".prisma/client").MusterArticle[];
        author: {
            uuid_user: string;
            name: string;
        };
    }[]>;
    getAllMusterArticlesPagenation(uid: string, page?: number): Promise<{
        name: string;
        description: string;
        type: import(".prisma/client").MusterType;
        muster_id: string;
        muster_img: string;
        article_data: (import(".prisma/client").MusterArticle & {
            labels: {
                Labels: {
                    name: string;
                    description: string;
                    label_id: string;
                };
            }[];
        })[];
        author: {
            uuid_user: string;
            name: string;
        };
    }[]>;
    getAllGatherArticles(uid: string, p?: number): Promise<{
        description: string;
        article_data: import(".prisma/client").GatherArticle[];
        labels: {
            Labels: {
                name: string;
                description: string;
                label_id: string;
            };
        }[];
        gather_id: string;
        author: User;
    }[]>;
    getAllGatherArticlesPagenation(uid: string, p?: number): Promise<{
        description: string;
        article_data: {
            title: string;
            outer_id: string;
            hot: number;
            zan: number;
            edit_time: string;
            article_img: string;
            article_type: string;
            befollowed: import(".prisma/client").GatherArticleBeFollowed[];
            author: import(".prisma/client").Gather;
        }[];
        labels: {
            Labels: {
                name: string;
                description: string;
                label_id: string;
            };
        }[];
        gather_id: string;
        author: User;
    }[]>;
    addRecords(uid: string, article_id: string): Promise<User>;
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
    addUserZan(uid: string, id: string): Promise<User>;
    findUserZan(uid: string, id: string): Promise<{
        collection: import(".prisma/client").Collection[];
        be_follow: import(".prisma/client").BeFollow[];
        zan_list: import(".prisma/client").UserZan[];
    }>;
    getDraft(uid: string): Promise<User & {
        draft: import(".prisma/client").Draft[];
    }>;
    getUserSaved(uid: string): Promise<{
        collection: import(".prisma/client").Collection[];
    }>;
    saveArticle(uid: string, id: string): Promise<User>;
    getUserInfo(uid: string): Promise<{
        name: string;
        user_img: string;
    }>;
    getWritingArticle(uid: string): Promise<{
        muster_data: {
            article_data: {
                outer_id: string;
            }[];
        }[];
        gather_data: {
            article_data: {
                outer_id: string;
            }[];
        }[];
    }>;
    getBaseMusterInfo(uid: string): Promise<{
        muster_data: {
            name: string;
            muster_id: string;
        }[];
    }>;
    userBeFollowedNum(uid: string): Promise<{
        be_follow: import(".prisma/client").BeFollow[];
    }>;
    userBeFollowedStatus(uid: string, follow_user: string): Promise<{
        be_follow: import(".prisma/client").BeFollow[];
    }>;
    getColletionArticles(uid: string, page?: number): Promise<{
        collection: {
            article_id: string;
        }[];
    }>;
    getMusterArticleById(mid: string): Promise<{
        name: string;
        description: string;
        muster_img: string;
        article_data: import(".prisma/client").MusterArticle[];
        author: {
            uuid_user: string;
            name: string;
            user_img: string;
        };
    }>;
    cMuster(data: CMuster, uid: string): Promise<User>;
    getMusterColumn(uid: string): Promise<{
        muster_data: import(".prisma/client").Muster[];
    }>;
}
