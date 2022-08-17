import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class RecommendItem {
  
  @Field({nullable: false})
  Id: string

  @Field({nullable: false})
  Score: number

}

// articles: item.article,
// id: item.id,
// muster: item.muster,
// type: item.article_type,
// title: item.tilte,
// author: item.outer_id,