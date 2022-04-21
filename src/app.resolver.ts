import { Res } from '@nestjs/common';
import { Resolver, Query, Args, Context, GraphQLExecutionContext, CONTEXT } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { redis } from './redis/redis';


interface MyContext {
  req: Request,
  res: Response
}

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // @Query(returns => String)
  // hello(@Context() context: MyContext) {
  //   context.res.setHeader("Access-Control-Allow-Origin", context.req.headers.origin)
  //   context.res.setHeader("Access-Control-Allow-Credentials", "true")
  //   context.res.cookie('sessionid','lishi',{maxAge:1000*60*60*24})
  //   return 'test01'
  // }

  // @Query(returns => String)
  // setCookie(@Context() context: MyContext) {
  //   return context.res.cookie['cid']
  // }

  @Query(returns => String)
  async getCookie(@Context() context: MyContext) {
    return context.req.session['uid'] + '1'
  }
}
