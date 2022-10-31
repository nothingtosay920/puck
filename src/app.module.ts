import { ApolloDriver, ApolloDriverAsyncConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { LabelModule } from './label/label.module';
import { CategoryModule } from './category/category.module';
import { RecommendModule } from './recommend/recommend/recommend.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './task/task.module';
import { EmitModule } from './emit/emit.module';
import statusMonitorConfig from './statusMonitor';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { SearchModule } from './search/search.module';


@Module({
  imports: [
    HttpModule,
    ArticleModule,
    AuthModule,
    LabelModule,
    CategoryModule,
    RecommendModule,
    ScheduleModule.forRoot(),
    TasksModule,
    EmitModule,
    StatusMonitorModule.forRoot(statusMonitorConfig),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({req, res}) => ({ req, res }),
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    SearchModule
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
