import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { RoleService } from './role.service';

@Module({
  providers: [RoleService,  AppService],
})
export class RoleModule {}
