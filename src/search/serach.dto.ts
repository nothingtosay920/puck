import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ArticleType } from "@prisma/client";
import { IsString } from "class-validator";

@InputType()
export class IndexData {
  @IsString()
  @Field({nullable: false})
  id: string

  @IsString()
  @Field({nullable: false})
  type: ArticleType

  @IsString()
  @Field({nullable: false})
  category: string

  @Field(() => [String])
  labels: string[]

  @Field({nullable: false})
  title: string

}

@InputType()
export class IndexQuery {
  @Field({nullable: false})
  title: string
}

// @ObjectType()
// export class ElasticData {
//   @Field({nullable: false})
//   _id: string
// }

