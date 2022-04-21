import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AppService } from 'src/app.service';
import { AuthResolver } from './auth.resolver';
import { RoleService } from 'src/role/role.service';
import { ArticleService } from 'src/article/article.service';

@Module({
  imports: [
    PassportModule
  ],
  providers: [UsersService, AuthService, AppService, AuthResolver, RoleService, ArticleService],
  exports: [RoleService]
})
export class AuthModule {}
