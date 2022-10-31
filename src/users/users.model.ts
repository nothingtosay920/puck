import { Module } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { AppService } from "src/app.service";
import { CategoryService } from "src/category/category.service";
import { LabelService } from "src/label/label.service";
import { RecommendItemModule } from "src/recommend/item/item.module";
import { RecommendUserModule } from "src/recommend/user/user.model";
import { RcommendUserService } from "src/recommend/user/user.service";
import { SearchModule } from "src/search/search.module";
import { UsersService } from "./users.service";


@Module({
  imports: [
    RecommendUserModule,
    RecommendItemModule,
    SearchModule
  ],
  providers: [UsersService, AppService, RcommendUserService, CategoryService, LabelService],
  exports: [RecommendUserModule, RecommendItemModule]
})
export class UsersModule {}
