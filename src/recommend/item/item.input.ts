import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";


@InputType()
export class Item {

  @IsString()
  @Field({ nullable: false})
  ItemId: string;

  @Field({ nullable: false})
  @IsNumber()
  Timestamp: string

  @Field(() => [String], { nullable: true })
  @IsString()
  Labels: string[]

  @Field(() => [String], { nullable: true })
  Categories: string[]
}