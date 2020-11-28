import { Directive, Field, ObjectType, ID } from '@nestjs/graphql';

/* eslint-disable prettier/prettier */
@ObjectType('Student')
@Directive('@key(fields: "id")')
export class Student {

  @Field(type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
