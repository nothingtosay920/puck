import { HttpService } from '@nestjs/axios';
import { Query, Resolver } from '@nestjs/graphql';
import * as FormData from 'form-data'
import { createReadStream, readFile, readFileSync } from 'fs';
import { firstValueFrom, map } from 'rxjs';
import { format, formatDistance, parse, toDate } from 'date-fns';
import { zhCN } from 'date-fns/locale';

@Resolver()
export class AppResolver {
  constructor(private readonly httpService: HttpService) {}

  @Query(returns => String)
  hello() {
    const tod = parse("2022-07-31 22:54:24", 'yyyy-MM-dd HH:mm:ss', new Date())
    const v = formatDistance(tod, new Date(), {locale: zhCN})    
    console.log(v, tod);
    
    return 'test:' 
  }
  
}
