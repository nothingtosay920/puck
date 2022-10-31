import { ExecutionContext, Req, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { format } from 'date-fns';
import { AllArticlesInfo, AllArticlesPagenation, AllGatherPagenation, ArticleData, ArticleDataPagenation, Draft, DraftRes, GatherData } from 'src/article/article.dto';
import { UserAuthGuard } from 'src/guard/user-auth.guard';
import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { RecommendService } from 'src/recommend/recommend/recommend.service';
import { UserBeFollowed, UserFollowedItem } from 'src/recommend/user/user.dto';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { BaseMusterData, BaseMusterInfo, BaseUserInfo, Dynamic, DynamicApiRes, MessageData, UsersDATA } from 'src/users/users.dto';
import { GatherInput, SavedArticleInput } from 'src/users/users.input';
import { UsersService } from 'src/users/users.service';
import { AuthService, IContext } from './auth.service';

@Resolver()
export class AuthResolver {

  constructor(private readonly authService: AuthService, 
    private readonly userService: UsersService,
    private readonly feedbackService: FeedbackService,
    private recommendService: RecommendService

  ) {}

  
  @Mutation(() => Number)
  async Login(@Args("phone") phone: string, @Context() context: IContext) {
    await this.authService.Login(phone, context)
    return 200
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Number)
  async addArticle(@Args('data') data: SavedArticleInput, @Context() context: IContext) {
    await this.userService.createArticle(data, context.req.session['uid'])
    return 200
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Number)
  async savedArticle(@Args('data') data: SavedArticleInput, @Context() context: IContext) {
    await this.userService.saveArticle(data, context.req.session['uid'])
    return 200
  }

  // 添加muster
  @UseGuards(UserAuthGuard)
  @Mutation(() => Number)
  async createMuster(@Args('data') data: GatherInput, @Context() context: IContext) {
     await this.userService.createColumn(data, context.req.session['uid'])
     return 200
  } 

  @Query(() => [GatherData])
  async getMusterColumn(@Context() context: IContext) {
    const articles = await this.userService.getColumn(context.req.session['uid'])
    return articles.articles
  }

  @Query(() => GatherData)
  async getColumnArticles(@Args('data') data: string) {
    return await this.userService.getColumnArticle(data)
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Number)
  async addZan(@Args('data') id: string, @Context() context: IContext) {
    const uid = context.req.session['uid']
    const zan = await (await this.userService.findZan(uid, id)).zan
    
    if (zan.length) {
      await this.userService.removeZan(uid, id)
    } else {
      await this.userService.addZan(uid, id)
      await this.feedbackService.insertFeedbacks({
        FeedbackType: "star",
        Timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' +0800 CST',
        UserId: uid,
        ItemId: id
      })
    }
    
   return 200
 }


  @Query(() => BaseUserInfo)
  async getUserInfo(@Context() context: IContext) {
    return await this.userService.getUserInfo(context.req.session['uid'])
  }



  @Query(() => DynamicApiRes)
  async getDynamic(@Args('page') page: number, @Context() context: IContext) {
    const res = await this.userService.getDynamic(context.req.session['uid'], page)
    return {
      dynamic: res.dynamic,
      next: page + 1,
      count: res.dynamic.length
    }
  }

  @Query(() => [BaseMusterData], {nullable: true})
  async getBaseMusterInfo(@Context() context: IContext) {
    return await (await this.userService.getBaseMusterInfo(context.req.session['uid'])).articles
  }

  @Query(() => [ArticleData])
  async getSingleInfo(@Context() context: IContext) {
    const data = await this.userService.getSingleInfo(context.req.session['uid'])
    const res = data.articles.reduce((prev, current) => {
      prev.push(...current.articles.map((item) => {
        return {
          ...item,
          article_type: current.article_type
        }
      }))
      return prev
    }, [])
    return res

  }


  @Query(() => AllGatherPagenation)
  async getAllColumnArtilces(@Args('page') page: number, @Context() context: IContext) {
    const data = await this.userService.getAllColumnArtilcesPagenation(context.req.session['uid'], page)
    return {
      data: data.articles,
      next: page + 1
    }
  }

  @Query(() => [GatherData])
  async getGatherArtilces(@Context() context: IContext) {
    const data = await this.userService.getAllGatherArticlesPagenation(context.req.session['uid'])
    return data.articles
  }

  @Query(() => AllArticlesPagenation)
  async getAllArticlesPagenation(@Args('page') page: number, @Context() context: IContext) {
    const articles = await this.userService.getAllArticles(context.req.session['uid'], page)
    return {
      data: articles,
      next: page + 1,
    }
  }

  @Query(() => [AllArticlesInfo])
  async getAllArticles(@Context() context: IContext) {
    const articles = await this.userService.getAllArticles(context.req.session['uid'])
    return articles
  }


  @Mutation(() => Number)
  LogOut(@Context() context: IContext) {
    this.authService.LogOut(context)
    return 200
  }

  // 写接口 usersDto
  // @UseGuards()
  @Query(() => UsersDATA, {nullable: true})
  async getUserData(@Context() context: IContext) {
    const uid = context.req.session['uid']
    
    if (uid) {
      return await this.authService.getUserData(uid)
    } else {
      return {
        name: null,
        uuid: null,
        user_img: null
      }
    }
  }

  @Mutation(() => Number)
  async followedUser(@Context() context: IContext, @Args('followed_id') followed_id: string) {
    const uid = context.req.session['uid']
    await this.userService.followUser(uid, followed_id)
    await this.userService.addInfo(followed_id, uid)
    return 200
  }

  @Query(() => UserBeFollowed)
  async getBeFollowedNum(@Context() context: IContext) {
    return  (await this.userService.userBeFollowed(context.req.session['uid'])).info
  }

  @Query(() => [String], {nullable: true})
  async getUserRecommend(@Args('page') page: number, @Context() context: IContext) {
     return await this.recommendService.userRecommend(context.req.session['uid'], page)
  } 


  // @Query(() => [UserFollowedItem], {nullable: true})
  // async getUserFollow(@Context() context: IContext) {
  //   const uid = context.req.session['uid']
  //   return await this.authService.getUserFollow(uid)
  // }
}
