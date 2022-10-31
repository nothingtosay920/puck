import { Field, ObjectType } from "@nestjs/graphql"
import { ArticleData } from "src/article/article.dto"

@ObjectType()
export class RecommendItem {
  
  @Field({nullable: false})
  Id: string

  @Field({nullable: false})
  Score: number

}

@ObjectType()
export class RecommendRes {
  @Field(() => [ArticleData])
  data: ArticleData[]

  @Field({nullable: false})
  next: Number
}

@ObjectType()
export class RelateRecommendRes {
  @Field(() => [String])
  data: String[]

  @Field({nullable: false})
  next: Number
}