import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AssignStudentsToLessonInput } from './assign-students-lesson.input';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.type';
import { StudentService } from '../student/student.service';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => Lesson)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [Lesson])
  lessons() {
    return this.lessonService.getAllLessons();
  }

  @Mutation((returns) => Lesson)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => Lesson)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  /**
   * This is how we can resolve parent relationships only when they are requested.
   *
   * @param lesson
   */
  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log('Logs the children ids like this');
    console.log(lesson);
    return this.studentService.getManyStudents(lesson.students);
  }
}
