import prisma from "../utils/prisma";
import { Attendance, AttendanceStatus } from "@prisma/client";

// Type for marking attendance
type MarkAttendanceInput = {
  studentId: number;
  classId: number;
  date: string;
  status: AttendanceStatus;
  markedById?: number;
};

export const markAttendance = async (data: MarkAttendanceInput): Promise<Attendance> => {
  return prisma.attendance.create({
    data: {
      studentId: data.studentId,
      classId: data.classId,
      date: new Date(data.date),
      status: data.status,
      markedById: data.markedById,
    },
  });
};

export const getAttendance = async (): Promise<Attendance[]> => {
  return prisma.attendance.findMany({
    include: { student: true, class: true, markedBy: true },
  });
};

export function getAttendanceForClass(classId: number, arg1: Date) {
  throw new Error("Function not implemented.");
}
export function getAttendanceForStudent(studentId: number) {
  throw new Error("Function not implemented.");
}

