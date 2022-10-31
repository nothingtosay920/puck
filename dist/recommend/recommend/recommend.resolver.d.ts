import { ArticleService } from 'src/article/article.service';
import { IContext } from 'src/auth/auth.service';
import { CategoryService } from 'src/category/category.service';
import { RecommendService } from './recommend.service';
export declare class RecommendResolver {
    private readonly recommendService;
    private readonly articleService;
    private readonly categoryService;
    constructor(recommendService: RecommendService, articleService: ArticleService, categoryService: CategoryService);
    recommendList(label: string, newest: string, page: number): Promise<{
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
                article_type: import(".prisma/client").ArticleType;
                author: import(".prisma/client").User;
                gather_img: string;
                article_description: string;
            };
            author: {
                name: string;
                uuid: string;
                user_img: string;
            };
            article_type: import(".prisma/client").ArticleType;
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
    latestList(label: string, page: number): Promise<{
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
                article_type: import(".prisma/client").ArticleType;
                author: import(".prisma/client").User;
                gather_img: string;
                article_description: string;
            };
            author: {
                name: string;
                uuid: string;
                user_img: string;
            };
            article_type: import(".prisma/client").ArticleType;
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
    popularList(label: string, page: number): Promise<{
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
                article_type: import(".prisma/client").ArticleType;
                author: import(".prisma/client").User;
                gather_img: string;
                article_description: string;
            };
            author: {
                name: string;
                uuid: string;
                user_img: string;
            };
            article_type: import(".prisma/client").ArticleType;
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
    userRecommend(context: IContext, page: number): Promise<{
        data: [string];
        next: number;
    }>;
    relateRecommend(label: string, context: IContext): Promise<Promise<{
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
            article_type: import(".prisma/client").ArticleType;
            author: import(".prisma/client").User;
            gather_img: string;
            article_description: string;
        };
        author: {
            name: string;
            uuid: string;
            user_img: string;
        };
        article_type: import(".prisma/client").ArticleType;
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
    }>[]>;
}
