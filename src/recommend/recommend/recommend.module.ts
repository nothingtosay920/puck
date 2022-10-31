import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppService } from 'src/app.service';
import { ArticleService } from 'src/article/article.service';
import { RecommendService } from './recommend.service';
import { RecommendResolver } from './recommend.resolver';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';

@Module({
  imports: [
    HttpModule,
    PassportModule,
  ],
  providers: [AppService, RecommendService, RecommendResolver, ArticleService, CategoryService, LabelService],
  exports: [RecommendService, HttpModule]
})
export class RecommendModule {}
