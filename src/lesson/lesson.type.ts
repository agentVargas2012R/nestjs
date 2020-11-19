/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType('Lesson')
export class Lesson {

  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  //represented as ISO Strings
  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
