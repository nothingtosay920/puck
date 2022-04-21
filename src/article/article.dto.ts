import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";


export type ArtiType = 'GATHER' | 'SOLO'

@ObjectType()
export class ArticleDTO {

  @Field({ nullable: false})
  title: string
  
  @Field(() => [String])
  contents: string[]

  articleType: ArtiType

}