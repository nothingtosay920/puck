import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';

@Module({
  providers: [AppService, ArticleService, ArticleResolver]
})
export class ArticleModule {
  
}
