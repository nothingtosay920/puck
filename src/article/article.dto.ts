import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MusterType } from "@prisma/client";
import { Label } from "src/label/label.dto";


export type ArtiType = 'GATHER' | 'SOLO'


export type ArticleType = 'GATHER' | 'MUSTER'

@ObjectType()
export class LabelDto {
  
  @Field({nullable: false})
  label: string

  @Field({nullable: true})
  name: string

  @Field({nullable: true})
  description: string
}

@ObjectType()
export class MusterArticleDTO {
  @Field({ nullable: false})
  description: string
  
  @Field()
  article: string

  
}

@ObjectType()
export class GatherArticle {
  @Field({nullable: false})
  title: string

  @Field({nullable: false})
  outer_id: string

  @Field({nullable: false})
  article: string

  @Field({nullable: false})
  article_type: string
}

@ObjectType()
export class ArticleDTO {

  @Field({nullable: true})
  article: string

  @Field({nullable: true})
  description: string

  @Field({nullable: true})
  muster: string

  @Field({nullable: true})
  title: string

  @Field({nullable: true})
  id: string

  @Field({nullable: false})
  article_img: string

  @Field({nullable: false})
  type: string

  @Field({nullable: false})
  edit_time: string

  @Field({nullable: true})
  author: string

  @Field({nullable: true})
  gather: string

  @Field(() => [String])
  labels: string[]

  @Field({nullable: false})
  categorys: string

  @Field({nullable: false})
  zan: string

  @Field({nullable: false})
  hot: string

  @Field({nullable: false})
  outer_id: string

  @Field({nullable: true})
  befollowed: number

  @Field({nullable: false})
  zan_status: Boolean

  @Field({nullable: false})
  follow_status: Boolean

  @Field({nullable: false})
  collection_status: Boolean

  @Field({nullable: false})
  author_img: string

  @Field({nullable: false})
  author_name: string

  @Field({nullable: true})
  timestamp: string
}

@ObjectType()
export class RecordsRes {
  @Field(() => [ArticleDTO])
  article_data: ArticleDTO[]

  @Field({nullable: false})
  next: number
}

@ObjectType()
export class Befollowed {
  @Field({nullable: true})
  user_id: string

  @Field({nullable: true})
  gather_article_id: string
}

@ObjectType()
export class Polymerization {
  
  @Field({nullable: true})
  author: string

  @Field({nullable: true})
  author_name: string

  @Field({nullable: true})
  muster_id: string

  @Field({nullable: true})
  gather_id: string

  @Field({nullable: true})
  muster_img: string

  @Field({nullable: true})
  article_data: number

  @Field({nullable: true})
  name: string

  @Field({nullable: true})
  type: MusterType

  @Field({nullable: true})
  description: string

  @Field({nullable: true})
  article_id: string
}

@ObjectType()
export class DynamicRes {

  @Field({nullable: true})
  description: string

  @Field({nullable: true})
  title: string

  @Field({nullable: true})
  id: string

  @Field({nullable: true})
  article_img: string

  @Field({nullable: true})
  acticle_type: string

  @Field({nullable: true})
  edit_time: string

  @Field({nullable: true})
  author: string

  @Field({nullable: true})
  zan: string

  @Field({nullable: true})
  hot: string

  @Field({nullable: true})
  outer_id: string

  @Field({nullable: true})
  author_img: string

  @Field({nullable: true})
  author_name: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  user_img: string

  @Field({ nullable: true })
  open_id: string

  @Field({nullable: false})
  zan_status: Boolean

  @Field({nullable: false})
  follow_status: Boolean

  @Field({nullable: false})
  collection_status: Boolean

  @Field(() => [String])
  labels: string[]

  @Field({nullable: false})
  categorys: string

  @Field({nullable: true})
  type: string
}

@ObjectType()
export class DraftArticle {
  @Field(() => [String])
  labels: string[]

  @Field({nullable: true})
  categorys: string

  @Field({nullable: true})
  description: string

  @Field({nullable: true})
  gather_id: string

  @Field(() => [ArticleDTO], {nullable: true})
  article_data: ArticleDTO

  @Field(() => String, {nullable: true})
  title: string

  @Field(() => String, {nullable: true})
  article: string

  @Field(() => String, {nullable: true})
  article_img: string

  @Field(() => String, {nullable: true})
  type: string

  @Field(() => String, {nullable: true})
  muster: string

  @Field(() => String, {nullable: true})
  id: string
}

@ObjectType()
export class WritingList {

  @Field(() => [ArticleIdDto])
  muster_data: ArticleIdDto[]

  @Field(() => [ArticleIdDto])
  gather_data: ArticleIdDto[]

}

@ObjectType()
class OuterId {
  @Field({nullable: false})
  outer_id: string
}

@ObjectType()
class ArticleIdDto {
  @Field(() => [OuterId])
  article_data: OuterId[]
}

@ObjectType()
export class collectionList {
  @Field(() => [collection])
  list: collection[]
}


@ObjectType()
class collection {
  @Field(() => String)
  title: string

  @Field(() => String)
  hot: string

  @Field(() => String)
  zan: string

  @Field(() => String)
  edit_time: string
}

@ObjectType()
export class collectionArticleRes {
  @Field(() => [ArticleDTO])
  list: ArticleDTO[]

  @Field({nullable: false})
  next: number

  @Field({nullable: false})
  count: number
}
@ObjectType()
class LabelTypeInArticle {
  @Field({nullable: false})
  label_id: string

  @Field({nullable: true})
  name: string

  @Field({nullable: true})
  description: string
} 

@ObjectType()
class Labels {
  @Field()
  Labels: LabelTypeInArticle
}



@ObjectType()
export class AllArticles {
  @Field({nullable: false})
  title: string


  @Field({nullable: false})
  zan: string

  @Field({nullable: false})
  hot: string

  @Field({nullable: false})
  outer_id: string

  @Field({nullable: false})
  article_img: string

  @Field({nullable: false})
  article_type: string

  @Field({nullable: false})
  description: string

  @Field({nullable: false})
  edit_time: string

  @Field(() => [Labels])
  labels: Labels[]
}

@ObjectType()
export class AllArticlesRes {
  @Field({nullable: false})
  next: number

  @Field({nullable: false})
  count: number

  @Field(() => [AllArticles])
  AllArticles: AllArticles[]
}

@ObjectType()
export class AddArticleRes {
  @Field({nullable: false})
  article_id: string
}

@ObjectType()
class AuthorInfo extends OuterId {
  @Field({nullable: false})
  uuid_user: string

  @Field({nullable: false})
  name: string

  @Field({nullable: false})
  user_img: string
}

@ObjectType()
export class MusterArticleById {
  @Field({nullable: false})
  muster_img: string

  @Field({nullable: false})
  name: string

  @Field({nullable: false})
  author: AuthorInfo

  @Field(() => [ArticleDTO])
  article_data: ArticleDTO[]

  @Field({nullable: false})
  description: string
}

@ObjectType()
export class MusterColumn {
  @Field({nullable: false})
  name: string

  @Field({nullable: false})
  description: string

  @Field({nullable: false})
  type: 'MUSTER'

  @Field({nullable: false})
  muster_id: string

  @Field({nullable: false})
  muster_img: string

  @Field({nullable: false})
  authorId: string
}