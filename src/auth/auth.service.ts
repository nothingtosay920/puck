import { Injectable, Dependencies, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { InfoService } from 'src/info/info.service';
import store from 'src/main';
import { RcommendUserService } from 'src/recommend/user/user.service';
import { UsersService } from '../users/users.service';

export type IContext = {
  req: Request,
  res: Response
}


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly recommendUserService: RcommendUserService,
    private jwtService: JwtService,
    private infoService: InfoService
      
     ) {}

  async Login(phone: string, context: IContext) {
      let user = await this.usersService.findOneByPhone(phone)

      if (!user) {
        const openId = nanoid()
        user = await this.usersService.create({
          phone: phone,
          name: nanoid(),
          uuid: openId,
          user_img: "https://ending-homework.oss-cn-beijing.aliyuncs.com/avtar.png",
          user_role: {
            create: {
              role: "USER"
            }
          }
        })
        await this.infoService.createInfo(openId)
        await this.recommendUserService.insertUser({
          UserId: openId,
          Labels: []
        })
        
      } 
      context.req.session['uid'] = user.uuid
      
      context.res.cookie('token', this.jwtService.sign({
        uuid: user.uuid,
      }), {
        maxAge: 604800 * 1000,
        signed: false
      })
      return context.req.session['uid']
  }

  async LogOut(context: IContext) {
    const session = context.req.sessionID
    context.res.clearCookie('connect.sid')
    context.res.clearCookie('token')
    store.destroy(session)
    return {
      code: 200
    }
  }

  async getUserData(uid: string) {
    return await this.usersService.findOne(uid)
  }

  async getUserFollow(uid: string) {
    return await (await this.usersService.getUserFollow(uid)).follow
  }
}