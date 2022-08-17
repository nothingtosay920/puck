import { Field, InputType, Int } from "@nestjs/graphql";


@InputType()
export class UsersInput {

  @Field({ nullable: false})
  readonly phone: string
}


@InputType()
export class MusterArticle {
  @Field({nullable: false })
  title: string

  @Field({ nullable: false })
  description: string

  @Field({nullable: false })
  article: string

  @Field({nullable: false })
  articleImg: string
} 

@InputType()
export class LabelType {
  @Field({nullable: false})
  label: string
}

@InputType()
export class MusterInput {
  @Field({ nullable: false })
  article_data: MusterArticle

  @Field({nullable: true})
  category: string

  @Field(() => [LabelType])
  labels: LabelType[]

  @Field({nullable: false})
  muster_id: string

  @Field({nullable: true})
  name?: string

  @Field({nullable: true})
  muster_article_id: string

  @Field({nullable: true})
  muster_img: string

  @Field({nullable: true})
  muster_desc: string
}

@InputType()
export class GatherArticle {
  @Field({nullable: false })
  title: string


  @Field({nullable: false })
  article: string

  @Field({nullable: false })
  article_img: string
}


@InputType()
export class GatherInput {
  @Field(() => [GatherArticle])
  article_data: GatherArticle[]

  @Field({nullable: false})
  category: string

  @Field(() => [LabelType])
  labels: LabelType[]

  @Field({nullable: false})
  description: string

  @Field({nullable: false})
  gather_id: string

  @Field({nullable: false})
  gather_article_id: string

  @Field({nullable: false})
  gather_img: string
}
