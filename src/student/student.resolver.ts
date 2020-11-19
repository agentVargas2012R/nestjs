import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  //TODO: Remember the return type is coming from the student.type.ts file.
  @Query((result) => [Student])
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Query((result) => Student)
  async getStudentById(@Args('id') id: string) {
    return this.studentService.getStudentById(id);
  }
}
