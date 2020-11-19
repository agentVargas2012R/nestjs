import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { Student } from './student.type';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation((result) => Student)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
