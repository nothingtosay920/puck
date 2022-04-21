import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { redis } from 'src/redis/redis';
import { nanoid } from 'nanoid';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export interface LocalGuardReturns {
  cid: string
}


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly role: RoleService) {
    super()
  }

  async validate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req

    // let cid =  req.session['cid']

    // if (!cid) {
    //   cid = nanoid()
    //   req.session['cid'] = 
    // }
    // return {
    //   cid
    // }
    // .then((result) => {
    //   let cid = result
    //   console.log(result);
    //   if (!cid) {
    //     cid = nanoid()
    //     redis.set('cid', cid)
    //   } 
    //   return {
    //     cid 
    //   }
    // })

   
  }
}