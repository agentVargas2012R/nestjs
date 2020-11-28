import { UseGuards, HttpService } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Permission } from '../enums/permissions.enum';
import { Permissions } from '../guards/permissions.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { EnrollmentGuard } from '../guards/enrollment.guard';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';
import { Student } from './student.type';

@Resolver((of) => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation((result) => Student)
  @UseGuards(
    new AuthGuard(),
    new EnrollmentGuard(new HttpService(), Permission.CREATE),
  )
  async createStudent(
    @Context('student') student,
    @Args('createStudentInput')
    createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  //TODO: Remember the return type is coming from the student.type.ts file.
  @Query((result) => [Student])
  @UseGuards(new AuthGuard())
  async getAllStudents(@Context('student') student) {
    return this.studentService.getAllStudents();
  }

  @Query((result) => Student)
  async getStudentById(@Args('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Student> {
    return this.studentService.getStudentById(reference.id);
  }
}
