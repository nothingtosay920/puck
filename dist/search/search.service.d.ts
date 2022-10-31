import { ElasticsearchService } from "@nestjs/elasticsearch";
export declare class SearchService {
    private readonly client;
    constructor(client: ElasticsearchService);
    Search(query: string, page: number): Promise<string[]>;
}
