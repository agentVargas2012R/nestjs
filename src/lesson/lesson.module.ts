import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonResolver } from './lesson.resolver';
import { typeOrmConfig } from '../../config/typeorm.config';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson]), StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
