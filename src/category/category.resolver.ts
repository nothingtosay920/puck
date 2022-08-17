import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CreateLabelInput } from 'src/label/label.input';
import { Category } from './category.dto';
import { CreateCategoryInput } from './category.input';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  getCategorys() {
    return this.categoryService.getCategory()
  }

  @Mutation(() => Category)
  createCategory(@Args("data") data: CreateCategoryInput) {
    return this.categoryService.createUserCategory(data)
  }

  // @Query(() => Number)
  // putCategory(@Args("id") id: string, @Args('desc') desc: string) {
    
  //   this.categoryService.putCategory(id, desc)
  //   return 200
  // }

  // @Query(() => Number)
  // testChange(@Args('id') id: string, @Args('d') d: string) {
  //    this.categoryService.testChange(id, d)
  //    return 1
  // }
}
