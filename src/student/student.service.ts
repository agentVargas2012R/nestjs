import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student: Student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return this.studentRepository.save(student);
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne(id);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    console.log(studentIds);
    /**
     * SELECT * FROM public.student  WHERE id in (
     * '4edf070c-e75c-49a8-93d8-3d5b4db105c1',
     *      '1b10613e-8a7e-4f57-9dc4-8368ef9fe757')
     */
    const students = this.studentRepository
      .createQueryBuilder()
      .select('student')
      .from(Student, 'student')
      .where('student.id in (:...students)', { students: studentIds })
      .getMany();
    return students;
  }
}
