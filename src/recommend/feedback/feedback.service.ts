import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common"
import { firstValueFrom, map } from "rxjs";
import { FeebBackArgs } from "./feedback.input";
 

@Injectable()
export class FeedbackService {
  constructor(private httpService: HttpService) {}
  // Insert feedbacks.Ignore if exists.
  async insertFeedbacks(data: FeebBackArgs) {
    
    return await firstValueFrom(this.httpService.put(process.env.RECOMMEND_SERVICE + '/api/feedback', [data]).pipe(map(res => {
      return res.data
    })))
  }

  // Insert feedbacks.Overwrite if exists.
  // putFeedbacks() {}

  async getFeedbacks() {
    return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/feedback').pipe(map(res => res.data)))
  }

  // Get feedbacks with feedback type.
  // async getFeedbacksByType(type: string) {
  //   return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/feedback' + `/${type}`).pipe(map(res => res.data)))
  // }

  // // Get feedbacks between a user and a item.
  // async getFeedbacksByUserIdItemId(userId: string, itemId: string) {
  //   return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/feedback' + `/${userId}` + `/${itemId}`).pipe(map(res => res.data)))
  // }

  // async deleteFeedbacksByID(type: string, userId: string, itemId: string) {
  //   return await firstValueFrom(this.httpService.delete(process.env.RECOMMEND_SERVICE + '/feedback' + `/${type}` + `/${userId}` + `/${itemId}`).pipe(map(res => res.data)))
  // }

  // async getFeedbacksByUserId(userId: string) {
  //   return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/user' + `/${userId}` + '/feedback').pipe(map(res => res.data)))
  // }

  // async getFeedbacksByItemId(itemId: string) {
  //   return await firstValueFrom(this.httpService.get(process.env.RECOMMEND_SERVICE + '/item' + `/${itemId}` + '/feedback').pipe(map(res => res.data)))
  // }
  
}