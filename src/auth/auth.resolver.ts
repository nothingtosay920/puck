import { ExecutionContext, Req, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DynamicType } from '@prisma/client';
import { validateOrReject } from 'class-validator';
import { AddArticleRes, AllArticles, AllArticlesRes, ArticleDTO, MusterArticleById, MusterColumn, Polymerization, WritingList } from 'src/article/article.dto';
import { CMuster } from 'src/article/article.input';
import { UserAuthGuard } from 'src/guard/user-auth.guard';
import { BaseMusterInfo, BaseUserInfo, Draft, Dynamic, DynamicApiRes, LoginDTO, LogOutDto, UsersDATA } from 'src/users/users.dto';
import { GatherInput, MusterInput } from 'src/users/users.input';
import { UsersService } from 'src/users/users.service';
import { AuthService, IContext } from './auth.service';

@Resolver()
export class AuthResolver {

  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}
  
  @Mutation(() => LoginDTO)
  Login(@Args("phone") phone: string, @Context() context: IContext) {
    return this.authService.Login(phone, context)
  }

  // @UseGuards(UserAuthGuard)
  // @Mutation(() => String)
  // addGatherArticle(@Args("data") data: GatherInput, @Context() context: IContext) {
  //   return this.userService.createGather(data, context)
  // }

  // @UseGuards(UserAuthGuard)
  // @Mutation(() => String)
  // addMusterArticle(@Args("mArticle") mArticle: MusterInput, @Context() context: IContext) {
  //   return this.userService.createMusterArticle(mArticle, context)
  // }

  @Mutation(() => AddArticleRes)
  async addMuster(@Args('data') data: MusterInput, @Context() context: IContext) {
    return await this.userService.createMuster(data, context.req.session['uid'])
  }

  @Mutation(() => Number)
  savedMuster(@Args('data') data: MusterInput, @Context() context: IContext) {
    return this.userService.savedMuster(data, context.req.session['uid'])
  }
  @Mutation(() => AddArticleRes)
  addGather(@Args('data') data: GatherInput, @Context() context: IContext) {
    console.log(data.labels);
    
    return this.userService.createGather(data, context.req.session['uid'])
  }

  @Mutation(() => Number)
  saveGather(@Args('data') data: GatherInput, @Context() context: IContext) {
    return this.userService.savedGather(data, context.req.session['uid'])
  }


  // 添加muster
  @Mutation(() => Number)
  async createMuster(@Args('data') data: CMuster, @Context() context: IContext) {
     await this.userService.cMuster(data, context.req.session['uid'])
     return 200
  } 

  @Query(() => [MusterColumn])
  async getMusterColumn(@Context() context: IContext) {
     return await (await this.userService.getMusterColumn(context.req.session['uid'])).muster_data
  }

  // @UseGuards(UserAuthGuard)
  // @Mutation(() => String)
  // saveMusterArticle(@Args("mArticle") mArticle: MusterInput, @Context() context: IContext) {
  //   return this.userService.saveMusterArticle(mArticle, context)
  // }

  @Query(() => BaseUserInfo)
  getUserInfo(@Context() context: IContext) {
    return this.userService.getUserInfo(context.req.session['uid'])
  }

  @Query(() => [Draft])
  async getDraft(@Context() context: IContext) {
    const user = await this.userService.getDraft(context.req.session['uid'])
    return user.draft
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

  @Query(() => BaseMusterInfo)
  getBaseMusterInfo(@Context() context: IContext) {
    return this.userService.getBaseMusterInfo(context.req.session['uid'])
  }


  @Query(() => Number)
  async saveArticle(@Args('data') data: string, @Context() context: IContext) {
     await this.userService.saveArticle(context.req.session['uid'], data)
     return 200
  }


  @Query(() => [Polymerization])
  async getAllMuster(@Args('page') page: number, @Context() context: IContext) {
    const article =  await this.userService.getAllMusterArticles(context.req.session['uid'], page)
    const res = article.map((item) => {
      return {
        ...item,
        author_name: item.author.name,
        author: item.author.uuid_user,
        article_data: item.article_data.length,
        name: item.name ? item.name : item.article_data[0].title,
        muster_img: item.muster_img ? item.muster_img : item.article_data[0].article_img,
        description: item.description ? item.description : item.article_data[0].description,
        article_id: item.type === 'SINGLE' ? item.article_data[0].outer_id : null
      }
    })
    return res
  }

  @Query(() => MusterArticleById)
  async getMusterInfoById(@Args('mid') mid: string) {
    return await this.userService.getMusterArticleById(mid)
  }



  @Query(() => [Polymerization])
  async getGatherArtilces(@Context() context: IContext) {
    const article = await this.userService.getAllGatherArticlesPagenation(context.req.session['uid'])

    const res = article.map((item) => {
      return {
        ...item,
        author_name: item.author.name,
        author: item.author.uuid_user,
        article_data: item.article_data.map((item) => {
          return {
            ...item,
            befollowed: item.befollowed.length
          }
        })
      }
    })
    return res
  }

  @Query(() => AllArticlesRes)
  async getAllArticles(@Args('page') page: number, @Context() context: IContext) {
    const muster = await this.userService.getAllMusterArticlesPagenation(context.req.session['uid'], page)
    const musterArticle = muster.reduce((prev, current) => {
      prev.push(...current.article_data)
      return prev
    }, [])
  
    const gather = await (await this.userService.getAllGatherArticlesPagenation(context.req.session['uid'], page)).reduce((prev, current) => {
      prev.push(...current.article_data.map((item) => {
        return {
          ...item,
          labels: current.labels
        }
      }))
      return prev
    }, [])
    const res = [...musterArticle, ...gather].sort((a, b) => {
      return a.edit_time - b.edit_time
    })
    
    return {
      AllArticles: res,
      next: page + 1,
      count: res.length
    }
  }


  @Mutation(() => LogOutDto)
  LogOut(@Context() context: IContext) {
    console.log(context.req.session['uid']);
    
    return this.authService.LogOut(context)
  }

  // writing页article
  @Query(() => WritingList)
  async getWritingArticle(@Args('uid') uid: string) {
    return await this.userService.getWritingArticle(uid)
  }


  // 写接口 usersDto
  // @UseGuards()
  @Query(() => UsersDATA)
   getUserData(@Context() context: IContext) {
    return this.authService.getUserData(context)
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Number)
  async followedUser(@Args('uid') uid: string, @Args('followed_id') followed_id: string) {
    await this.userService.followUser(uid, followed_id)
    await this.userService.beFollowUser(followed_id, uid)
    return 200
  }

  @Query(() => Number)
  async getBeFollowedNum(@Context() context: IContext) {
    return  (await this.userService.userBeFollowedNum(context.req.session['uid'])).be_follow.length
  }

  @Query(() => Boolean)
  async getBeFollowedStatus(follow_user: string, @Context() context: IContext) {
    return await (await this.userService.userBeFollowedStatus(context.req.session['uid'], follow_user)).be_follow.length > 0
  }

}
