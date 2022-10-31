import { Field, InterfaceType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ArticleType } from "@prisma/client";
import { Label } from "src/label/label.dto";
import { BaseMusterArticle, UserData } from "src/users/users.dto";
import { UserInfoInter } from "src/users/users.interface";
import { ArticleInter, ArticlePanelStatusInter, BeFollowedInter, CategoryInter, CollectionInter, DraftInter, GatherInter, GatherResInterface, ZanInter } from "./article.interface";


@ObjectType({
  implements: [BeFollowedInter]
})
export class BeFollowed{}

@ObjectType({
  implements: [DraftInter]
})
export class Draft{}

@ObjectType()
export class DraftRes {
  @Field(() => [Draft])
  data: Draft[]

  @Field({nullable: false})
  next: number
}

@ObjectType({
  implements: [CollectionInter]
})
export class Collection{}

@ObjectType({
  implements: [ZanInter]
})
export class Zan{}

@ObjectType({
  implements: [CategoryInter]
})
export class Category{}


@ObjectType({
  implements: [GatherResInterface]
})
export class GatherRes{}

@ObjectType({
  implements: [ArticleInter]
}) 
export class  ArticleData {
  @Field({nullable: true})
  zan_status: boolean

  @Field({nullable: true})
  collection_status: boolean

  @Field({nullable: true})
  follow_status: boolean

  @Field({nullable: true})
  follow_user: boolean

  @Field(()=> [Zan])
  zan: Zan[]

  @Field(()=> [BeFollowed], {nullable: true})
  beFollowed: BeFollowed[]

  @Field(()=> [Collection], {nullable: true})
  collection: Collection[]

  @Field(()=> [Draft])
  draft: Draft[]

  @Field(()=> [Label])
  labels: Label[];

  @Field(()=> [Category])
  categorys: Category[];

  @Field({nullable: true})
  gather: GatherRes

}

@ObjectType({
  implements: [ArticleInter]
})
export class RecordsArticleData{
  @Field({nullable: false})
  timestamp: string

  @Field(()=> [Zan])
  zan: Zan[]
}

@ObjectType()
export class RecordsDataPagenation{
  @Field(()=> [RecordsArticleData])
  data: RecordsArticleData[]

  @Field({nullable: false})
  next: number
}

@ObjectType()
export class ArticleDataPagenation{
  @Field(()=> [ArticleData])
  data: ArticleData[]

  @Field({nullable: false})
  next: number
}

@ObjectType({
  implements: [UserInfoInter]
})
export class DynamicRes extends ArticleData{
  @Field(()=> [ArticleData])
  data: ArticleData[]

  @Field({nullable: false})
  next: number
}

@ObjectType({
  implements: [GatherInter]
})
export class GatherData {

}

@ObjectType({
  implements: [GatherInter]
})
export class AllArticlesInfo{
  @Field({nullable: false})
  author: UserData;
}

@ObjectType()
export class AllArticlesPagenation {
  @Field(()=> [AllArticlesInfo])
  data: AllArticlesInfo[]

  @Field({nullable: false})
  next: number
}

@ObjectType()
export class AllGatherPagenation {
  @Field(()=> [GatherData])
  data: GatherData[]

  @Field({nullable: false})
  next: number
}

@ObjectType()
export class WritingArticle {
  @Field({nullable: false})
  type: ArticleType

  @Field({nullable: false})
  gather_id: string

  @Field({nullable: false})
  gather_name: string

  @Field({nullable: false})
  gather_img: string

  @Field({nullable: false})
  category: string

  @Field({nullable: false})
  article_description: string

  @Field(() => [String])
  labels: string[]

  @Field(() => [ArticleData])
  article_data: ArticleData[]
}

@ObjectType({
  implements: [ArticlePanelStatusInter]
})
export class ArticlePanelStatus{}