import prisma from "../utils/prisma"

export async function createClass(data: {
  name: string
  grade?: string
  teacherId?: number
}) {
  return prisma.class.create({ data })
}

export async function getAllClasses() {
  return prisma.class.findMany({
    include: { teacher: true, students: true }
  })
}

export async function getClassById(id: number) {
  return prisma.class.findUnique({
    where: { id },
    include: { teacher: true, students: true, attendance: true }
  })
}

export async function updateClass(id: number, data: Partial<{
  name: string
  grade: string
  teacherId: number
}>) {
  return prisma.class.update({
    where: { id },
    data
  })
}

export async function deleteClass(id: number) {
  return prisma.class.delete({ where: { id } })
}