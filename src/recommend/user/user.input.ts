import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class RecommendUserInput {
  @Field(() => String)
  UserId: string

  @Field(() => [String])
  Labels: String[]
}