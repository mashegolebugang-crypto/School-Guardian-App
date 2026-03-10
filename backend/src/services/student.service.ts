import prisma from "../utils/prisma";
import { Student } from "@prisma/client";

// Type for creating a student
type CreateStudentInput = {
  firstName: string;
  surname: string;
  admissionNo: string;
  dateOfBirth?: string;
  gender: "male" | "female" | "other";
  classId?: number;
  parentId?: number;
};

export const createStudent = async (data: CreateStudentInput): Promise<Student> => {
  const student = await prisma.student.create({
    data: {
      firstName: data.firstName,
      surname: data.surname,
      admissionNo: data.admissionNo,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      gender: data.gender,
      classId: data.classId,
      parentId: data.parentId,
    },
  });
  return student;
};

export const getStudents = async (): Promise<Student[]> => {
  return prisma.student.findMany({
    include: {
      class: true,
      parent: true,
      attendance: true,
    },
  });
};

export function getStudentById(id: number) {
  throw new Error("Function not implemented.");
}
export function updateStudent(id: number, body: any) {
  throw new Error("Function not implemented.");
}

