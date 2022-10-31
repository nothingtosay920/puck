import { ArticleDTO } from "src/article/article.dto";
import { ArticleResolver } from "src/article/article.resolver";
import { SearchService } from "./search.service";
export declare class SearchResolver {
    private searchService;
    private articleResolver;
    constructor(searchService: SearchService, articleResolver: ArticleResolver);
    getArtice(id: string): Promise<any>;
    Search(query: string, page: number): Promise<Promise<ArticleDTO>[]>;
}
