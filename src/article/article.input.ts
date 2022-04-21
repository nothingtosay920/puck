import { Field, InputType, Int } from "@nestjs/graphql";
import { ArtiType } from "./article.dto";

@InputType()
export class ArticleInput {

  @Field({ nullable: false})
  readonly title: string
  
  @Field(() => [String])
  readonly contents: string[]

  readonly articleType: ArtiType
}