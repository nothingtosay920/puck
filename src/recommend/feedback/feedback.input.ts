import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class FeebBackArgs {
  @Field({ nullable: false})
  FeedbackType: string

  @Field({ nullable: false})
  UserId: string

  @Field({ nullable: false})
  ItemId: string

  @Field({ nullable: false})
  Timestamp: string
}