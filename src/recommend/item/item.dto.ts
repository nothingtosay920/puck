


import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsObject, IsString, MaxLength } from "class-validator";

@ObjectType()
export class ItemRes {
  @Field()
  @IsNumber()
  RowAffected: number
}

