import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class UsersInput {

  @Field({ nullable: false})
  readonly phone: string
}


@InputType()
export class musterArticle {
  
  @Field({ nullable: false })
  tilte: string

  @Field({nullable: false })
  article: string
}


@InputType()
export class musterInput {
  @Field({ nullable: false })
  article_data: musterArticle

  @Field({ nullable: false })
  name: string
}

