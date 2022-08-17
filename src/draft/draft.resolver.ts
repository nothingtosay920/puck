import { Args, Mutation } from "@nestjs/graphql";
import { ArticleType } from "src/article/article.dto";
import { DraftService } from "./draft.service";



export class DraftResolver {
  constructor(private draftService: DraftService) {}



  // @Mutation(() => Number)
  // addDraft(@Args("uid") uid: string, @Args("article_id") article_id: string, @Args("type") type: ArticleType) {
  //   return this.draftService.addDraft(uid, article_id, type)
  // }
}