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
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/jwt/constants';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { SearchModule } from 'src/search/search.module';
import { FeedbackService } from 'src/recommend/feedback/feedback.service';
import { RecommendService } from 'src/recommend/recommend/recommend.service';
import { InfoService } from 'src/info/info.service';

@Module({
  imports: [
    SearchModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
    SearchModule
  ],
  providers: [InfoService, AuthService, AppService, AuthResolver, RoleService, UsersService,CategoryService, LabelService, JwtStrategy, FeedbackService, RecommendService],
  exports: [RoleService]
})
export class AuthModule {}
