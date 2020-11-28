import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { applyMiddleware } from 'graphql-middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req: req.headers }),
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
