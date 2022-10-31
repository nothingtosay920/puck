import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Args, Query } from "@nestjs/graphql";



@Injectable()
export class SearchService {
  constructor(private readonly client: ElasticsearchService) {}

  async Search(query: string, page: number) {
    const searchRes = await this.client.search({
      index: 'articles',
      body: {
        size: 10,
        from: 10 * page,
        query: {
          match: { title: query }
        }
      }
    })
    
    
    const data = searchRes.hits.hits.map((item) => item._id)
    return data
  }
}