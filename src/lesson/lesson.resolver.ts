import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.type';

@Resolver((of) => Lesson)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

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
}
