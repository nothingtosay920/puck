import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "@prisma/client";
import { IsString } from "class-validator";

@ObjectType()
export class Label {

  @Field({nullable: false})
  name: string

  @Field({nullable: false })
  description: string

  @Field({nullable: false })
  category: string

  @Field()
  label_id: string
}