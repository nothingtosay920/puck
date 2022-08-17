import { Field, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";



@ObjectType()
export class RecommendUserRes {
  @Field()
  @IsNumber()
  RowAffected: number
}