import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleData } from 'src/article/article.dto';
import { ArticleService } from 'src/article/article.service';
import { IContext } from 'src/auth/auth.service';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';
import { LabelType } from 'src/users/users.input';
import { UsersService } from 'src/users/users.service';
import { RecommendItem, RecommendRes, RelateRecommendRes } from './recommend.dto';
import { RecommendArticles } from './recommend.input';
import { RecommendService } from './recommend.service';

@Resolver()
export class RecommendResolver {

  constructor(
    private readonly recommendService: RecommendService,
    private readonly articleService: ArticleService,
    private readonly categoryService: CategoryService
  ) {}

  @Query(() => RecommendRes, {nullable: true})
  async recommendList(@Args('label') label: string, @Args('newest') newest: string, @Args('page') page: number) {
    if (newest === 'newest') {
      return this.latestList(label, page)
    } else {
      return this.popularList(label, page)
    }
  }
  
  async latestList(label: string, page: number) {
    
    const list = await this.recommendService.latestRecoommend(label, page)
    const res = list.map(async (item) => {
      const article = await this.articleService.getArticle(item.Id)
      const gather = await this.articleService.getGather(article.gather_id)
      return {
        ...article,
        gather,
        author: {
          name: gather.author.name,
          uuid: gather.author.uuid,
          user_img: gather.author.user_img
        },
        article_type: gather.article_type
      }
    })
    return {
      data: res,
      next: page + 1
    }
    
  }

  async popularList( label: string, page: number) {
    
    const list = await this.recommendService.popularRecommend(label, page)
    const res = list.map(async (item) => {
      const article = await this.articleService.getArticle(item.Id)
      const gather = await this.articleService.getGather(article.gather_id)
      return {
        ...article,
        gather,
        author: {
          name: gather.author.name,
          uuid: gather.author.uuid,
          user_img: gather.author.user_img
        },
        article_type: gather.article_type
      }
    })
    return {
      data: res,
      next: page + 1
    }
    
  }

  @Query(() => RelateRecommendRes)
  async userRecommend(@Context() context: IContext, @Args('page') page: number) {
    const uid = context.req.session['uid']
    let data = await this.recommendService.userRecommend(uid, page)
    if (!data) {
      data = ['']
    } 
    
    return {
      data: data, 
      next: page + 1
    }
  }

  @Query(() => [ArticleData])
  async relateRecommend(@Args('label') label: string, @Context() context: IContext) {
    const uid = context.req.session['uid']
    let data = []
    if (uid) {
      try {
        data = await this.recommendService.relateRecommend(uid)
      } catch (error) {
        data = []
      }
    } else {
      try {
        const category = await (await this.categoryService.findCategoryById(label)).description
        const res = await this.recommendService.popularRelate(category)
        data = res.map<string>((item) => item.Id)
        
      } catch (error) {
        data = []
      }
    }
    if (data === null) {
      data = []
    }
    
    const res = data.map(async (item) => {
      const article = await this.articleService.getArticle(item)
      
      const gather = await this.articleService.getGather(article.gather_id)
      return {
        ...article,
        gather,
        author: {
          name: gather.author.name,
          uuid: gather.author.uuid,
          user_img: gather.author.user_img
        },
        article_type: gather.article_type
      }
    })
    return res
  }

}
