import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';
import { GatherService } from 'src/muster/gather.service';
import { MusterService } from 'src/muster/muster.service';
import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { RecommendItemService } from 'src/recommend/item/item.service';
import { RecommendService } from 'src/recommend/recommend/recommend.service';
import { UsersService } from 'src/users/users.service';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  imports: [HttpModule],
  providers: [
    AppService, 
    GatherService, 
    MusterService, 
    ArticleService,
    ArticleResolver, 
    RecommendService, 
    UsersService, 
    FeedbackService,
    RecommendItemService,
    CategoryService,
    LabelService
  ],
    
  exports: [RecommendService]
})
export class ArticleModule {}
