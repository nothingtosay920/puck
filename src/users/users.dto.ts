import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ArticleType } from "@prisma/client";
import { IsEmail, IsNotEmpty, isNotEmpty, IsObject, IsString, MaxLength } from "class-validator";
import { ArticleData } from "src/article/article.dto";
import { InfoReadDataInter, UserInfoInter } from "./users.interface";

@ObjectType({
  implements: [UserInfoInter] 
})
export class UserData {}

@ObjectType()
export class UsersDATA {
  @Field({ nullable: true })
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsString()
  user_img: string

  @Field({ nullable: true })
  @IsString()
  uuid: string
}

@ObjectType()
export class Dynamic {
  @Field({nullable: false})
  content: string

  @Field({nullable: false})
  type: string

  @Field({nullable: false})
  time_tamp: string

  @Field({nullable: false})
  dynamic_id: string
}

@ObjectType()
export class DynamicApiRes {
  @Field(() => [Dynamic])
  dynamic: Dynamic[]

  @Field({nullable: false})
  next: number

  @Field({nullable: false})
  count: number
}

@ObjectType()
export class BaseUserInfo {
  @Field({nullable: false})
  user_img: string

  @Field({nullable: false})
  name: string
}

@ObjectType()
export class BaseMusterInfo {
  @Field(() => [BaseMusterData], {nullable: true})
  data: BaseMusterData[]

  @Field({nullable: false})
  next: number
}


@ObjectType()
export class BaseMusterArticle {
  @Field({nullable: true})
  outer_id: string
}

@ObjectType()
export class BaseMusterData {
  @Field({nullable: true})
  gather_name: string

  @Field({nullable: true})
  gather_id: string

  @Field({nullable: true})
  gather_img: string
  @Field({nullable: true})
  article_description: string
  @Field({nullable: true})
  article_type: string

  @Field(() => [BaseMusterArticle])
  articles: BaseMusterArticle[]
}
 
@ObjectType({
  implements: [InfoReadDataInter]
})
export class InfoReadData{}

@ObjectType()
export class MessageData{
  @Field({nullable: false})
  timestamp: string;

  @Field({nullable: false})
  title: string;

  @Field({nullable: false})
  article_id: string;

  @Field({nullable: false})
  article_type: ArticleType

  @Field({nullable: false})
  info: InfoReadData
}

@ObjectType()
export class MessageDataRes {
  @Field(() =>[MessageData])
  data: MessageData[]

  @Field({nullable: false})
  next: number
}