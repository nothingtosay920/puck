import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';
import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { RecommendItemService } from 'src/recommend/item/item.service';
import { RecommendService } from 'src/recommend/recommend/recommend.service';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { SearchModule } from 'src/search/search.module';
import { SearchService } from 'src/search/search.service';
import { UsersService } from 'src/users/users.service';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [HttpModule, SearchModule],
  providers: [
    AppService, 
    ArticleService,
    ArticleResolver, 
    RecommendService, 
    UsersService, 
    FeedbackService,
    RecommendItemService,
    CategoryService,
    LabelService,
    JwtService,
    SearchService,
    RcommendUserService
  ],
    
  exports: [RecommendService] 
})
export class ArticleModule {}
