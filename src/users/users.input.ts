import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ArticleType } from "@prisma/client";
import { IsString, MaxLength } from "class-validator";

@InputType()
export class UsersInput {

  @Field({ nullable: false})
  readonly phone: string
}

@InputType()
export class GatherInput {

  @Field({ nullable: false})
  gather_name: string

  @Field({ nullable: false})
  article_description: string

  @Field({ nullable: false})
  gather_img: string
}

@InputType()
export class ArticleInput {
  @Field({nullable: false })
  title: string

  @Field({nullable: false })
  outer_id: string

  @Field({nullable: false })
  article: string

  @Field({nullable: false })
  article_img: string

  @Field({nullable: false })
  edit_time: string

  @Field({nullable: true })
  description: string
  
}

@InputType()
export class SavedArticleInput {
  @Field({nullable: true })
  gather_name: string

  @Field({nullable: false })
  article_type: ArticleType

  @Field({ nullable: true })
  article_description: string

  @Field({nullable: true })
  gather_img: string

  @Field(() => [ArticleInput])
  article_data: ArticleInput[]

  @Field(() => [String])
  labels: string[]

  @Field({ nullable: false })
  gather_id: string

  @Field({nullable: false})
  category: string

} 

@InputType()
export class LabelType {
  @Field({nullable: false})
  label: string
}

// @InputType()
// export class Test {
//   @MaxLength(5, {
//     message: "必须小于5个子"
//   })
//   @Field({nullable: false})
//   a: string


// }