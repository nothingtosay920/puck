import { ExecutionContext, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from 'src/article/article.service';
import { UserAuthGuard } from 'src/guard/user-auth.guard';
import { LoginDTO, Users, UsersDATA } from 'src/users/users.dto';
import { musterInput } from 'src/users/users.input';
import { UsersService } from 'src/users/users.service';
import { AuthService, IContext } from './auth.service';

@Resolver()
export class AuthResolver {

  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}
  
  @Mutation(() => LoginDTO)
  Login(@Args("phone") phone: string, @Context() context: IContext) {
    return this.authService.Login(phone, context)
  }

  @Query(() => String)
  Test() {
    return 'test'
  }

  @UseGuards(UserAuthGuard)
  @Mutation(() => Users)
  createMusterArticle(@Args("mArticle") mArticle: musterInput, @Context() context: IContext) {
    return this.userService.createMusterArticle(mArticle, context)
  }

  // 写接口 usersDto
  // @UseGuards()
  @Query(() => UsersDATA)
  async getUserData(@Context() context: IContext) {
    return this.authService.getUserData(context)
  }
}
