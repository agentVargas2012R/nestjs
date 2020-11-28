/* eslint-disable prettier/prettier */
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Student } from '../student/student.type';

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

  @Field(type => [Student])
  students: string[];
}
