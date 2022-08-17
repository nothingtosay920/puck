import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { AppService } from 'src/app.service';

@Module({
  providers: [AppService, CategoryService, CategoryResolver]
})
export class CategoryModule {}
