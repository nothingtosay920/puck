import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { LabelResolver } from './label.resolver';
import { LabelService } from './label.service';

@Module({
  providers: [AppService, LabelService, LabelResolver]
})
export class LabelModule {}
