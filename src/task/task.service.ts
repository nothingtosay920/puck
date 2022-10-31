import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import * as FormData from 'form-data';
import { createReadStream } from 'fs';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(TasksService.name);

  @Interval(1 * 1000 * 6) 
  handleCron() {
    this.gorse()
    this.logger.debug('Called when the second is 6');
  }

  // 维持gorse
  async gorse() {

    const file = new FormData()
    const form = createReadStream('./feedback.csv')
    file.append('file', form)
    
    const res = await firstValueFrom(this.httpService.post('http://180.76.174.196:8088/api/bulk/feedback', file, {
      headers: {
        ...file.getHeaders()
      }
    }).pipe(map(res => res.data)))
  }
}
