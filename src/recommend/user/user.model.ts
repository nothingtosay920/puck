import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { RcommendUserService } from "./user.service";



@Module({
  imports: [
    HttpModule
  ],
  providers: [
    RcommendUserService,
  ],
  exports: [HttpModule, RcommendUserService]
})
export class RecommendUserModule {}