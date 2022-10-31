import { Field, ObjectType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { UserBeFollowedInter } from "src/users/users.interface";



@ObjectType()
export class RecommendUserRes {
  @Field()
  @IsNumber()
  RowAffected: number
}

@ObjectType({
  implements: [UserBeFollowedInter]
})
export class UserBeFollowed {}

@ObjectType()
export class UserFollowedItem{
  @Field({nullable: false})
  follow_id: string;
}