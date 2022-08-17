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

@InputType()
export class CMuster {
  @Field({nullable: false})
  name: string

  @Field({nullable: false})
  desc: string

  @Field({nullable: false})
  muster_img: string
}