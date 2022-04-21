import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Request } from 'express';
import { redis } from 'src/redis/redis';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    let uid = await redis.get(req.session['uid'])
    if (!uid) {
      throw new AuthenticationError('UNAUTHENTICATED')
    } 
    const userRole = (await this.roleService.findOne(uid)).role
    if (userRole === 'ADMIN') {
      return true
    } else {
      return false
    }
  }
}