import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { RecommendService } from 'src/recommend/recommend/recommend.service';
import { GatherInput, SavedArticleInput } from 'src/users/users.input';
import { UsersService } from 'src/users/users.service';
import { AuthService, IContext } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    private readonly userService;
    private readonly feedbackService;
    private recommendService;
    constructor(authService: AuthService, userService: UsersService, feedbackService: FeedbackService, recommendService: RecommendService);
    Login(phone: string, context: IContext): Promise<number>;
    addArticle(data: SavedArticleInput, context: IContext): Promise<number>;
    savedArticle(data: SavedArticleInput, context: IContext): Promise<number>;
    createMuster(data: GatherInput, context: IContext): Promise<number>;
    getMusterColumn(context: IContext): Promise<(import(".prisma/client").Gather & {
        articles: import(".prisma/client").Article[];
    })[]>;
    getColumnArticles(data: string): Promise<import(".prisma/client").Gather & {
        articles: (import(".prisma/client").Article & {
            categorys: import(".prisma/client").Category[];
            zan: import(".prisma/client").Zan[];
            labels: import(".prisma/client").Label[];
        })[];
        author: import(".prisma/client").User;
    }>;
    addZan(id: string, context: IContext): Promise<number>;
    getUserInfo(context: IContext): Promise<import(".prisma/client").User & {
        zan: import(".prisma/client").Zan[];
        reading: import(".prisma/client").Reading[];
    }>;
    getDynamic(page: number, context: IContext): Promise<{
        dynamic: import(".prisma/client").Dynamic[];
        next: number;
        count: number;
    }>;
    getBaseMusterInfo(context: IContext): Promise<{
        articles: {
            outer_id: string;
        }[];
        gather_name: string;
        article_description: string;
        article_type: import(".prisma/client").ArticleType;
        gather_id: string;
        gather_img: string;
    }[]>;
    getSingleInfo(context: IContext): Promise<any[]>;
    getAllColumnArtilces(page: number, context: IContext): Promise<{
        data: import(".prisma/client").Gather[];
        next: number;
    }>;
    getGatherArtilces(context: IContext): Promise<import(".prisma/client").Gather[]>;
    getAllArticlesPagenation(page: number, context: IContext): Promise<{
        data: (import(".prisma/client").Gather & {
            articles: (import(".prisma/client").Article & {
                info: import(".prisma/client").Info[];
                categorys: import(".prisma/client").Category[];
                zan: import(".prisma/client").Zan[];
                labels: import(".prisma/client").Label[];
            })[];
            author: import(".prisma/client").User;
        })[];
        next: number;
    }>;
    getAllArticles(context: IContext): Promise<(import(".prisma/client").Gather & {
        articles: (import(".prisma/client").Article & {
            info: import(".prisma/client").Info[];
            categorys: import(".prisma/client").Category[];
            zan: import(".prisma/client").Zan[];
            labels: import(".prisma/client").Label[];
        })[];
        author: import(".prisma/client").User;
    })[]>;
    LogOut(context: IContext): number;
    getUserData(context: IContext): Promise<import(".prisma/client").User | {
        name: any;
        uuid: any;
        user_img: any;
    }>;
    followedUser(context: IContext, followed_id: string): Promise<number>;
    getBeFollowedNum(context: IContext): Promise<{
        uuid: string;
    }[]>;
    getUserRecommend(page: number, context: IContext): Promise<[string]>;
}
