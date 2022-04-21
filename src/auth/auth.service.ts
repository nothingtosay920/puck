import { Injectable, Dependencies, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { redis } from 'src/redis/redis';
import { UsersService } from '../users/users.service';


export type IContext = {
  req: Request,
  res: Response
}


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async Login(phone: string, context: IContext) {
      let user = await this.usersService.findOneByPhone(phone)
      if (!user) {
        user = await this.usersService.create({
          phone: phone,
          name: nanoid(),
          uuid_user: nanoid(),
          open_id: nanoid(),
          user_role: {
            create: {
              role: "USER"
            }
          }
        })
      } 
      context.req.session['uid'] = user.uuid_user
      return {
        code: '200',
        message: "创建成功"
      }
  }

  async getUserData(context: IContext) {
    const uid = context.req.session['uid']
    if (uid) {
      const user = await this.usersService.findOne(uid)
      return {
        data: {
          name: user.name
        }
      }
    } else {
      throw new Error('session非法')
    }
  }
}