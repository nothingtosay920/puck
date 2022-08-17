import { Injectable, Dependencies, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import store from 'src/main';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { UsersService } from '../users/users.service';

export type IContext = {
  req: Request,
  res: Response
}


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
     private readonly recommendUserService: RcommendUserService
     ) {}

  async Login(phone: string, context: IContext) {
      let user = await this.usersService.findOneByPhone(phone)

      if (!user) {
        const openId = nanoid()
        user = await this.usersService.create({
          phone: phone,
          name: nanoid(),
          uuid_user: nanoid(),
          user_img: "https://ending-homework.oss-cn-beijing.aliyuncs.com/avtar.png",
          open_id: openId,
          user_role: {
            create: {
              role: "USER"
            }
          }
        })
        await this.recommendUserService.insertUser({
          UserId: openId,
          Labels: ['前端', 'react.js']
        })
      } 
      context.req.session['uid'] = user.uuid_user
      return {
        code: '200',
        message: "创建成功"
      }
  }

  async LogOut(context: IContext) {
    const session = context.req.sessionID
    context.res.clearCookie('connect.sid')
    store.destroy(session)
    return {
      code: 200
    }
  }

  async getUserData(context: IContext) {
    const uid = context.req.session['uid']
    if (uid) {
      return await this.usersService.findOne(uid)
    }
    return {}
  }



}