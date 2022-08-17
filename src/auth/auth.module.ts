import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AppService } from 'src/app.service';
import { AuthResolver } from './auth.resolver';
import { RoleService } from 'src/role/role.service';
import { ArticleService } from 'src/article/article.service';
import { UsersModule } from 'src/users/users.model';
import { HttpModule } from '@nestjs/axios';
import { CategoryService } from 'src/category/category.service';
import { LabelService } from 'src/label/label.service';

@Module({
  imports: [
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService, AppService, AuthResolver, RoleService, UsersService,CategoryService, LabelService],
  exports: [RoleService]
})
export class AuthModule {}
