import { HttpService } from '@nestjs/axios';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class SearchResolver {
  constructor() {}

  @Query(returns => String)
  hello() {

    return 'test:' 
  }
  
}
