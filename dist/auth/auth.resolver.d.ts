import { CMuster } from 'src/article/article.input';
import { GatherInput, MusterInput } from 'src/users/users.input';
import { UsersService } from 'src/users/users.service';
import { AuthService, IContext } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    Login(phone: string, context: IContext): Promise<{
        code: string;
        message: string;
    }>;
    addMuster(data: MusterInput, context: IContext): Promise<{
        article_id: string;
    }>;
    savedMuster(data: MusterInput, context: IContext): Promise<number>;
    addGather(data: GatherInput, context: IContext): Promise<{
        article: string;
    }>;
    saveGather(data: GatherInput, context: IContext): Promise<number>;
    createMuster(data: CMuster, context: IContext): Promise<number>;
    getMusterColumn(context: IContext): Promise<import(".prisma/client").Muster[]>;
    getUserInfo(context: IContext): Promise<{
        name: string;
        user_img: string;
    }>;
    getDraft(context: IContext): Promise<import(".prisma/client").Draft[]>;
    getDynamic(page: number, context: IContext): Promise<{
        dynamic: import(".prisma/client").Dynamic[];
        next: number;
        count: number;
    }>;
    getBaseMusterInfo(context: IContext): Promise<{
        muster_data: {
            name: string;
            muster_id: string;
        }[];
    }>;
    saveArticle(data: string, context: IContext): Promise<number>;
    getAllMuster(page: number, context: IContext): Promise<{
        author_name: string;
        author: string;
        article_data: number;
        name: string;
        muster_img: string;
        description: string;
        article_id: string;
        type: import(".prisma/client").MusterType;
        muster_id: string;
    }[]>;
    getMusterInfoById(mid: string): Promise<{
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
    getGatherArtilces(context: IContext): Promise<{
        author_name: string;
        author: string;
        article_data: {
            befollowed: number;
            title: string;
            outer_id: string;
            hot: number;
            zan: number;
            edit_time: string;
            article_img: string;
            article_type: string;
            author: import(".prisma/client").Gather;
        }[];
        description: string;
        labels: {
            Labels: {
                name: string;
                description: string;
                label_id: string;
            };
        }[];
        gather_id: string;
    }[]>;
    getAllArticles(page: number, context: IContext): Promise<{
        AllArticles: any[];
        next: number;
        count: number;
    }>;
    LogOut(context: IContext): Promise<{
        code: number;
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
    getUserData(context: IContext): Promise<{}>;
    followedUser(uid: string, followed_id: string): Promise<number>;
    getBeFollowedNum(context: IContext): Promise<number>;
    getBeFollowedStatus(follow_user: string, context: IContext): Promise<boolean>;
}
