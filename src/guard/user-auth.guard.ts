import { CanActivate, ExecutionContext, Inject, Injectable, Module, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import { redis } from 'src/redis/redis';
import { RoleService } from 'src/role/role.service';


@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(@Inject(RoleService) private readonly roleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    let uid = req.session['uid']
    if (!uid) {
      throw new UnauthorizedException('用户未登录')
    } 
    
    const userRole = (await this.roleService.findOne(uid)).role
    if (userRole === 'USER') {
      return true
    } else {
      return false
    }
      
  }
}