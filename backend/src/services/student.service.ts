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

// Create a new student
export const createStudent = async (data: CreateStudentInput): Promise<Student> => {
  return prisma.student.create({
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
};

// Get all students
export const getStudents = async (): Promise<Student[]> => {
  return prisma.student.findMany({
    include: {
      class: true,
      parent: true,
      attendance: true,
    },
  });
};

// Get a student by ID
export const getStudentById = async (id: number): Promise<Student | null> => {
  return prisma.student.findUnique({
    where: { id },
    include: {
      class: true,
      parent: true,
      attendance: true,
    },
  });
};

// Update a student
export const updateStudent = async (id: number, body: Partial<CreateStudentInput>): Promise<Student> => {
  return prisma.student.update({
    where: { id },
    data: {
      ...body,
      dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : undefined,
    },
  });
};

// Delete a student
export const deleteStudent = async (id: number): Promise<Student> => {
  return prisma.student.delete({
    where: { id },
  });
};