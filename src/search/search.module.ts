import { Module, OnModuleInit } from "@nestjs/common";
import { ElasticsearchModule as BaseElasticsearchModule, ElasticsearchService } from "@nestjs/elasticsearch";
import { nanoid } from "nanoid";
import { SearchService } from "./search.service";
@Module({
  imports: [
    BaseElasticsearchModule.register({
      node: "http://180.76.174.196:9200/",
      generateRequestId: () => nanoid(),
      auth: {
        username: 'elastic',
        password: '123456'
      }
    }),
  ],
  providers: [SearchService],
  exports: [BaseElasticsearchModule]
})
export class SearchModule {}