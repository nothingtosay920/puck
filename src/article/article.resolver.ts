import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ArticleType, DynamicType, Gather, User } from '@prisma/client';
import { format } from 'date-fns';
import { IContext } from 'src/auth/auth.service';
import { jwtConstants } from 'src/jwt/constants';
import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { RecommendItemService } from 'src/recommend/item/item.service';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { SearchService } from 'src/search/search.service';
import { MessageData, MessageDataRes } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { AllArticlesPagenation, ArticleData, ArticleDataPagenation, ArticlePanelStatus, DynamicRes, RecordsDataPagenation, WritingArticle } from './article.dto';
import { ArticleService } from './article.service';
import { ArticleDataType, GatherRes } from './article.type';

@Resolver()
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly feedbackService: FeedbackService,
    private readonly userSerivce: UsersService,
    private jwtService: JwtService,
    private recommendItemService: RecommendItemService,
    private searchService: SearchService,
    private rcommendUserService: RcommendUserService
  ) {}

  @Query(() => ArticleData)
  async getArticleById(
    @Args('article_id') id: string, 
    @Args('token', {nullable: true}) token: string, 
  
  ): Promise<ArticleDataType & GatherRes> {
    let uid = undefined
    if (token) {
      uid = this.jwtService.verify(token, {
        secret: jwtConstants.secret
      }).uuid
    }
  
    let zan_status = false
    let follow_status = false
    let collection_status = false
    let follow_user = false

    const article = await this.articleService.getArticle(id)
    const gather = await this.articleService.getGather(article.gather_id)
    
    if (uid) {
      await this.userSerivce.addRecords(uid, id)
      follow_user = await (await this.userSerivce.getFollowUserStatus(uid, gather.author.uuid)).follow.length > 0

      zan_status = !!article.zan.find((element) => element.authorId === uid)
      follow_status = !!article.info.find((element) => element.uuid === uid)
      collection_status = !!article.collection.find((element) => element.user_id === uid)

      
        await this.feedbackService.insertFeedbacks({
          FeedbackType: "read",
          Timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' +0800 CST',
          UserId: uid,
          ItemId: id
        })
      
      
    }

    return {
      ...article,
      zan_status,
      follow_status,
      collection_status,
      follow_user,
      author: {
        name: gather.author.name,
        user_img: gather.author.user_img,
        uuid: gather.author.uuid
      },
      gather,
      article_type: gather.article_type
    }
  }

  @Mutation(() => Number)
  async insertFeeback(@Args('article_id') id: string, @Args('vid') vid: string) {
    await this.rcommendUserService.insertUser({
      UserId: vid,
      Labels: []
    })
    await this.feedbackService.insertFeedbacks({
      FeedbackType: "read",
      Timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' +0800 CST',
      UserId: vid,
      ItemId: id
    })
    return 200
  }

  @Query(() => ArticleData)
  async getArticleByIdNotFB(@Args('article_id') id: string, @Context() context: IContext): Promise<ArticleDataType & GatherRes> {

    const uid = context.req.session['uid']
    let zan_status = false
    let follow_status = false
    let collection_status = false
    let user: undefined | User = undefined

    const article = await this.articleService.getArticle(id)
    const gather = await this.articleService.getGather(article.gather_id)

    if (uid) {
      user = await this.userSerivce.findOne(uid)

      zan_status = !!article.zan.find((element) => element.authorId === uid)
      follow_status = !!article.info.find((element) => element.uuid === uid)
      collection_status = !!article.collection.find((element) => element.user_id === uid)

    }

    return {
      ...article,
      zan_status,
      follow_status,
      collection_status,
      author: {
        name: user.name,
        user_img: user.user_img,
        uuid: user.uuid
      },
      gather,
      article_type: gather.article_type
    }
  }

  @Query(() => Number)
  async removeArticleById(@Args('id') id: string) {
    await this.articleService.removeArticleById(id)
    return 200
  } 

  @Query(() => RecordsDataPagenation)
  async getRecords(@Args('page') page: number, @Context() context: IContext) {
    const records = await this.userSerivce.getRecords(page, context.req.session['uid'])
 
    
    const res = records.record.map(async (item) => {
      const article = await this.getArticleByIdNotFB(item.article_id, context)
      return {
        ...article,
        timestamp: item.timestamp,  
      }
    })
    return {
      data: res,
      next: page + 1
    }
  }


  @Query(() => ArticleDataPagenation)
  async Search(@Args('query') query: string,@Args('page') page: number) {
    const data = await this.searchService.Search(query, page)
    
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
    
    return {
      data: res,
      next: page + 1
    }
  }

  @Query(() => AllArticlesPagenation)
  async SearchAuthorArticle(@Args('query') query: string, @Args('author') author_id: string, @Args('page') page: number) {
    const data = await this.articleService.searchAuthorArticle(query, author_id, page)
    return {
      data,
      next: page + 1,
    }
  }

  @Query(() => ArticleDataPagenation)
  async SearchAllArticle(@Args('query') query: string, @Args('page') page: number,@Context() context: IContext) {
    const res = await this.articleService.searchAllArticle(query, context.req.session['uid'])
    return {
      data: res.articles,
      next: page + 1
    }
  }

  // async SearchRecords(@Args('query') query: string, @Args('page') page: number) {
    
  // }

  @Query(() => ArticleDataPagenation)
  async getUserSavedApi(@Context() context: IContext) {
    const collection = await this.userSerivce.getUserSaved(context.req.session['uid'])
    const res = collection.collection.map(async (item) => {
      return await this.articleService.getArticle(item.article_id)
    })
    return {
      data: res
    }
  }

  @Mutation(() => Number)
  async collectArticle(@Args('id') id: string, @Context() context: IContext) {
    const uid = context.req.session['uid']
    const data = await (await this.userSerivce.findArticleCollect(id, uid)).collection
    if (data.length) {
      await this.userSerivce.removeCollect(uid, id)
      
    } else {
      await this.userSerivce.collection(uid, id)
    }

    return 200
  }


  @Query(() => ArticleData)
  async dynamicApi(@Args('content') content: string, @Args('type') type: DynamicType, @Context() context: IContext) {
    switch (type) {
      case 'ZAN':
        return await this.getArticleByIdNotFB(content, context)
      case 'RELEASE':
        return await this.getArticleByIdNotFB(content, context)
      case 'FollowArticle':
        return await this.getArticleByIdNotFB(content, context)
      case 'COLLECTION': 
        return await this.getArticleByIdNotFB(content, context)
      case 'Follow':
        const user = await this.userSerivce.findOne(content)
        return {
          author: user
        }
    }
  }

  @Query(() => ArticleDataPagenation)
  async getDraft(@Args('page') page: number, @Context() context: IContext) {
    const data = await this.userSerivce.getDraft(context.req.session['uid'], page)
    const res = data.draft.map(async (item) => {
      console.log(item);
      
      return await this.getArticleByIdNotFB(item.article_id, context)
    })  
    return {
      data: res,
      next: page + 1,
    }
  }

  @Query(() => ArticleDataPagenation)
  async getCollectionArticles(@Args('page') page: number, @Context() context: IContext) {
    const list = await (await this.userSerivce.getColletionArticles(context.req.session['uid'], page)).collection
    const res = list.map(async (item) => {
      return await this.getArticleByIdNotFB(item.article_id, context)
    })
    return {
      data: res,
      next: page + 1,
    }
  }

  @Query(() => Number)
  async indexPanelArticle(@Context() context: IContext) {
    const lastestRecords = await (await this.userSerivce.getLastetRecords(context.req.session['uid'])).record[0].article_id
    const value = await this.recommendItemService.getItemNeighbors(lastestRecords)
    console.log(value);
    return 200
  }

  @Query(() => Number)
  async getArticleNeighbors(@Args('article_id') id: string) {
    const v = await this.recommendItemService.getItemNeighbors(id)
    console.log(v);
    return 200
    
  }

  @Mutation(() => Number)
  async followArticle(@Args("article_id") id: string, @Context() context: IContext) {
    const uid = context.req.session['uid']
    const data = await (await this.articleService.findArticleFollow(id, uid)).info
    if (data.length) {
      await this.articleService.remoceArticleFollow(id, uid)
    } else {
      await this.articleService.artilceBeFollowed(uid, id)
    }
    
    return 200
  }

  @Query(() => MessageDataRes, {nullable: true})
  async getUserMessage(@Args('page') page: number, @Context() context: IContext) {
    const data = await (await this.userSerivce.getMessage(context.req.session['uid'], page)).message
    return {
      data,
      next: page + 1,
    }
  }

  @Query(() => WritingArticle)
  async getWritingArticle(@Args('article_id') id: string) { 
    
    const article = await this.articleService.getArticle(id)
    const gather = await this.articleService.getGather(article.gather_id)

    return {
      type: gather.article_type,
      article_data: gather.article_type === 'GATHER' ? gather.articles : [article],
      gather_id: gather.gather_id,
      gather_name: gather.gather_name,
      gather_img: gather.gather_img,
      category: article.categorys[0].category_id,
      labels: article.labels.map((item) => item.label_id),
      article_description: gather.article_description
    }
  }

  @Query(() => ArticlePanelStatus)
  async getArticlePanelStatus(@Args('artcle_id') article_id: string, @Context() context: IContext) {
    const uid = context.req.session['uid']
    const res = {
      zan_status: false,
      collect_status: false,
      follow_status: false
    }
    if (uid) {
      const data = await this.articleService.getArticlePanelStatus(uid, article_id)
      res.zan_status = data.zan.length > 0
      res.collect_status = data.collection.length > 0
      res.follow_status = data.follow.length > 0
    }
    return res
  }

}
