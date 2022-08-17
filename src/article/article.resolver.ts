import { ForbiddenException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DynamicType } from '@prisma/client';
import { format } from 'date-fns';
import { IContext } from 'src/auth/auth.service';
import { GatherService } from 'src/muster/gather.service';
import { MusterService } from 'src/muster/muster.service';
import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { UsersDATA } from 'src/users/users.dto';
import { UsersService } from 'src/users/users.service';
import { addAbortSignal } from 'stream';
import { ArticleDTO, ArticleType, Befollowed, collectionArticleRes, collectionList, DraftArticle, DynamicRes, MusterArticleDTO, RecordsRes } from './article.dto';
import { ArticleService } from './article.service';

@Resolver()
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly feedbackService: FeedbackService,
    private readonly musterService: MusterService,
    private readonly gatherArticle: GatherService,
    private readonly userSerivce: UsersService
  ) {}

  @Query(() => ArticleDTO)
  async getArticleById(@Args('article_id') id: string, @Context() context: IContext): Promise<ArticleDTO> {
    
    const v = id[0] 
    let uid = context.req.session['uid']
    let status = false
    let follow_status = false
    let collection_status = false
    let res = undefined
    if (v === 'M') {
      res = await this.getMusterArticle(id) 
         
    } else if(v === 'G') {
      res = await this.getGatherArticle(id)
    } else {
      return null
    }
    
    if (uid) {
      await this.userSerivce.addRecords(uid, id)
      const findUser = await this.userSerivce.findUserZan(uid, id)
      status = findUser.zan_list.length > 0
      collection_status = findUser.collection.length > 0
      follow_status = res.befollowed.find((element) => element === uid)
      // await this.feedbackService.insertFeedbacks({
      //   FeedbackType: "read",
      //   Timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' +0800 CST',
      //   UserId: uid,
      //   ItemId: id
      // })
      
    }
    
    return {
      ...res,
      zan_status: status,
      follow_status: !!follow_status,
      collection_status,
      befollowed:res.befollowed.length
    }
  }

  @Query(() => ArticleDTO)
  async getArticleByIdNotFB(@Args('article_id') id: string, @Context() context: IContext): Promise<ArticleDTO> {
    const v = id[0]
    let res = undefined
    if (v === 'M') {
      res = await this.getMusterArticle(id) 
         
    } else if(v === 'G') {
      res = await this.getGatherArticle(id)
    } else {
      return null
    }
    const findUser = await this.userSerivce.findUserZan(context.req.session['uid'], id)
    const status = findUser.zan_list.length > 0
    const collection_status = findUser.collection.length > 0
    const follow_status = res.befollowed.find((element) => element === context.req.session['uid'])
    return {
      ...res,
      zan_status: status,
      follow_status: !!follow_status,
      collection_status,
      befollowed:res.befollowed.length
    }
  }

  @Query(() => RecordsRes)
  async getRecords(@Args('page') page: number, @Context() context: IContext) {
    const records = await this.userSerivce.getRecords(page, context.req.session['uid'])
    
    const res = records.record.map(async (item) => {
      const article_id = item.article_id.split('|')[1]
      const article = await this.getArticleByIdNotFB(article_id, context)
      return {
        ...article,
        timestamp: item.timestamp,  
      }
    })
    
    return {
      article_data: res,
      next: page + 1
    }
  }



  @Query(() => DraftArticle)
   async getWritingArticleById(@Args('article_id') id: string): Promise<DraftArticle> {
    const v = id[0]
    let res = undefined
    let categorys = undefined
    let labels = undefined
    if (v === 'M') {
      res = await this.getMusterArticle(id)  
      categorys = res.categorys
      labels = res.labels
    } else {
      res = await this.articleService.getGatherById(id)
      res = {
        ...res,
        type: 'GATHER'
      }
      categorys = res.categorys.map((item) => item.category)[0]
      labels = res.labels.map((item) => item.label)
      
    } 
    return {
      ...res,
      categorys,
      labels
    }
  }

  @Query(() => collectionList)
  async getUserSavedApi(@Context() context: IContext) {
    const collection = await this.userSerivce.getUserSaved(context.req.session['uid'])

    const res = collection.collection.map(async (item) => {
      const article = await this.getArticleById(item.article_id, context)
      return {
        title: article.title,
        hot: article.hot,
        zan: article.zan,
        edit_time: article.edit_time
      }
    })
    return {
      list: res
    }
  }

  

  @Query(() => DraftArticle)
  async getDraftArticleById(@Args('article_id') id: string) {
    const v = id[0]
    let res = undefined
    if (v === 'M') {
      res = await this.getMusterArticle(id) 
    } else if(v === 'G') {
      res = await this.articleService.getGatherById(id)
    } else {
      throw Error("article_id错误")
    }
    return res
  }
  @Mutation(() => Number)
   addZan(@Args('data') id: string, @Args("type") type: string, @Context() context: IContext) {
    if (type === 'MUSTER') {
      this.articleService.addZanInMuster(id)
    } else if(type === 'GATHER') {
      this.articleService.addZanInGather(id)
    }
    this.userSerivce.addUserZan(context.req.session['uid'], id)
    return 200
  }

  @Mutation(() => Number)
  async followedArticle(@Args('id') id: string, @Args('type') type: ArticleType, @Context() context: IContext) {
    const uid = context.req.session['uid']
    await this.articleService.artilceBeFollowed(uid, id, type)
    await this.userSerivce.collection(uid, id, uid + '|' + id)
    return 200
  }

  async getGatherArticle(article_id: string) {

    let data: any = {}
    try {
       data = await this.articleService.getGatherArticle(article_id)
    } catch (error) {
      throw new ForbiddenException('文章id错误')
    }

    const author = await this.gatherArticle.getGather(data.gather)
    const user = await this.userSerivce.findOne(author.authorId)

    return {
      description: author.description,
      article: data.article,
      title: data.title,
      img: data.article_img,
      labels: author.labels.map((item) => item.label),
      categorys: author.categorys[0].category,
      author: author.authorId,
      gather: author.gather_id,
      id: data.outer_id,
      type: data.article_type,
      article_img: data.article_img,
      befollowed: data.befollowed.map((item) => item.user_id),
      author_img: user.user_img,
      author_name: user.name,
      hot: data.hot,
      zan: data.zan,
      edit_time: data.edit_time

    }
  }

  async getMusterArticle(article_id: string) {
    let data: any = {}
    try {
       data = await this.articleService.getMusterArticle(article_id)
    } catch (error) {
      throw new ForbiddenException('文章id错误')
    }
    
    const author = await this.musterService.getMuster(data.muster)
    const user = await this.userSerivce.findOne(author.authorId)
    return {
      description: data.description,
      article: data.article,
      title: data.title,
      img: data.article_img,
      labels: data.labels.map((item) => item.label),
      categorys: data.categorys[0].category,
      author: author.authorId,
      muster: data.muster,
      id: data.outer_id,
      type: data.article_type,
      article_img: data.article_img,
      befollowed: data.befollowed.map((item) => item.user_id),
      author_img: user.user_img,
      author_name: user.name,
      hot: data.hot,
      zan: data.zan,
      edit_time: data.edit_time
    }
  }

  @Query(() => DynamicRes)
  async dynamicApi(@Args('content') content: string, @Args('type') type: DynamicType, @Context() context: IContext) {
    switch (type) {
      case 'ZAN':
        return await this.getArticleById(content, context)
      case 'RELEASE':
        return await this.getArticleById(content, context)
      case 'FollowArticle':
        return await this.getArticleById(content, context)
      case 'COLLECTION': 
        return await this.getArticleById(content, context)
      case 'Follow':
        return await this.userSerivce.findOne(content)
    }
  }

  @Query(() => collectionArticleRes)
  async getCollectionArticles(@Args('page') page: number, @Context() context: IContext) {
    const list = await (await this.userSerivce.getColletionArticles(context.req.session['uid'], page)).collection
    const res: Promise<ArticleDTO>[] = list.map(async (item) => {
      return await this.getArticleByIdNotFB(item.article_id, context)
    })
    return {
      list: res,
      next: page + 1,
      count: res.length
    }
  }

  @Query(() => Number)
  async removeMusterArticleById(@Args('id') id: string, @Context() context: IContext) {
    await this.articleService.removeMusterArticleById(id, context.req.session['uid'])
    return 200
  } 
}
