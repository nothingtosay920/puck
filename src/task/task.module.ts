import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TasksService } from './task.service';

@Module({
  imports: [HttpModule],
  providers: [
    TasksService
  ],
})
export class TasksModule {}
