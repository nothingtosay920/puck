import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { nanoid } from 'nanoid';
import { IContext } from 'src/auth/auth.service';
import { ArticleDTO } from './article.dto';
import { ArticleInput } from './article.input';
import { ArticleService } from './article.service';

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  // @Query(() => ArticleDTO)
  // async createArticle(@Args('articleInput') article: ArticleInput, @Context() context: IContext) {
  //   const uid = context.req.session['uid']
  //   return await this.articleService.createGather({
  //   })
  // }

  // @Query(() => [ArticleDTO])
  // async getArticles() {
  //   return await this.articleService.getArticle()
  // }
}
