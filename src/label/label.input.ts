import { Field, InputType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { IsString } from "class-validator";
import { CreateCategoryInput } from "src/category/category.input";

@InputType()
export class CreateLabelInput {

  @Field({ nullable: false})
  @IsString()
  readonly name: string

  // @Field({ nullable: false})
  // readonly category: string

  @Field({ nullable: false})
  @IsString()
  readonly description: string

  @Field()
  @IsString()
  readonly label_id: string

  @Field()
  @IsString()
  categorys: string

}





