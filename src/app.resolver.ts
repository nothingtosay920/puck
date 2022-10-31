import { ForbiddenException, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor() {}

  // @Query(() => Num)
  // async findAllTest() {
  //   throw new ForbiddenException();
  //   return 200
  // }

  
}
