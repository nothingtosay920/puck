import { AppService } from 'src/app.service';
import { ArticleType } from './article.dto';
export declare class ArticleService {
    private prisma;
    constructor(prisma: AppService);
    getGatherArticle(id: string): Promise<import(".prisma/client").GatherArticle & {
        befollowed: import(".prisma/client").GatherArticleBeFollowed[];
    }>;
    getMusterArticle(id: string): Promise<import(".prisma/client").MusterArticle & {
        labels: import(".prisma/client").MusterLabelMap[];
        categorys: import(".prisma/client").CategoryMusterMap[];
        befollowed: import(".prisma/client").MusterArticleBeFollowed[];
    }>;
    addZanInMuster(id: string): Promise<import(".prisma/client").MusterArticle>;
    addZanInGather(id: string): Promise<import(".prisma/client").GatherArticle>;
    readingsMuster(id: string): Promise<import(".prisma/client").MusterArticle>;
    artilceBeFollowed(uid: string, id: string, type: ArticleType): Promise<import(".prisma/client").GatherArticle | import(".prisma/client").MusterArticle>;
    getGatherById(id: string): Promise<import(".prisma/client").Gather & {
        labels: {
            label: string;
        }[];
        categorys: {
            category: string;
        }[];
        article_data: import(".prisma/client").GatherArticle[];
    }>;
    removeMusterArticleById(id: string, uid: string): Promise<number>;
}
