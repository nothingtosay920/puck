import { Field, InputType } from "@nestjs/graphql";
import { LabelType } from "src/users/users.input";

@InputType()
export class RecommendArticles {
  @Field(() => [LabelType])
  labels: LabelType[]
}