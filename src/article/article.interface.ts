import { Field, InterfaceType, ObjectType } from "@nestjs/graphql";
import { ArticleType } from "@prisma/client";
import { Label } from "src/label/label.dto";
import { UserData } from "src/users/users.dto";
import { ArticleData } from "./article.dto";


@InterfaceType()
export class GatherInter {
  @Field({nullable: false})
  gather_name: string
  
  @Field({nullable: false})
  article_description: string

  @Field({nullable: false})
  type: ArticleType

  @Field({nullable: false})
  gather_id: string

  @Field({nullable: false})
  gather_img: string

  @Field({nullable: false})
  authorId: string

  @Field(() => [ArticleData])
  articles: ArticleData[]

  @Field({nullable: false})
  article_type: ArticleType

  @Field({nullable: true})
  author: UserData
}

@InterfaceType()
export class ArticleInter {
  @Field({nullable: false})
  id: number

  @Field({nullable: false})
  title: string

  @Field({nullable: false})
  outer_id: string

  @Field({nullable: false})
  article: string

  @Field({nullable: false})
  description: string

  @Field({nullable: false})
  hot: number

  @Field({nullable: false})
  gather_id: string

  @Field({nullable: false})
  article_img: string

  @Field({nullable: false})
  article_type: ArticleType

  @Field({nullable: false})
  edit_time: string

  @Field({nullable: false})
  release: boolean

  @Field({nullable: true})
  author: UserData
}


@InterfaceType()
export class BeFollowedInter {
  @Field({nullable: false})
  article_id: string

  @Field({nullable: false})
  user_id: string
}

@InterfaceType()
export class ZanInter {
  @Field({nullable: false})
  article_id: string

  @Field({nullable: false})
  authorId: string
}


@InterfaceType()
export class DraftInter {
  @Field({nullable: false})
  article_id: string

  @Field({nullable: false})
  time_stmap: string

  @Field({nullable: false})
  user_id: string
}


@InterfaceType()
export class CollectionInter {
  @Field({nullable: false})
  collection_id: number

  @Field({nullable: false})
  article_id: string

  @Field({nullable: false})
  user_id: string
}

@InterfaceType()
export class CategoryInter {
  @Field({nullable: false})
  name: string

  @Field({nullable: false})
  description: string

  @Field({nullable: false})
  category_id: string

  @Field(() => [Label])
  labels: Label[]
}

@InterfaceType()
export class ArticleStatusInterface {
  @Field({nullable: false})
  author: string

  @Field({nullable: false})
  author_img: string

  @Field({nullable: false})
  author_name: string
}

@InterfaceType()
class ParalArticleInfoInter {
  @Field({nullable: false})
  title: string

  @Field({nullable: false})
  outer_id: string
}

@ObjectType({
  implements: [ParalArticleInfoInter]
})
class ParalArticleInfo{}


@InterfaceType()
export class GatherResInterface {
  @Field(() => [ParalArticleInfo])
  articles: ParalArticleInfo[]

  @Field({nullable: false})
  gather_id: string

  @Field({nullable: false})
  gather_name: string

  @Field({nullable: false})
  article_type: string
}

@InterfaceType()
export class ArticlePanelStatusInter {
  @Field({nullable: false})
  zan_status: boolean

  @Field({nullable: false})
  collect_status: boolean

  @Field({nullable: false})
  follow_status: boolean
}

// @InterfaceType()
// export class SearchResInterface {
//   @Field(() => [ArticleDataInterface])
//   data: ArticleDataInterface[]

//   @Field({nullable: false})
//   next: number
// }