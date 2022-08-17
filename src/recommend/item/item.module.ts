import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { RecommendItemService } from "./item.service";



@Module({
  imports: [
    HttpModule
  ],
  providers: [
    RecommendItemService,
  ],
  exports: [HttpModule, RecommendItemService]
})
export class RecommendItemModule {}