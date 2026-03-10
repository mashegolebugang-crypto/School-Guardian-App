import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in .env file');
  process.exit(1);
}

// ✅ Use `datasources.db.url` (backward-compatible with Prisma 7)
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.$executeRawUnsafe(
    'TRUNCATE "User", "Class", "Parent", "Student", "Attendance", "Notification" RESTART IDENTITY CASCADE;'
  );

  // Create admin and teacher
  const adminPassword = await hash('admin123', 10);
  const teacherPassword = await hash('teacher123', 10);

  const admin = await prisma.user.create({
    data: {
      fullName: 'Admin User',
      email: 'admin@school.com',
      passwordHash: adminPassword,
      role: 'admin',
    },
  });

  const teacher = await prisma.user.create({
    data: {
      fullName: 'John Teacher',
      email: 'teacher@school.com',
      passwordHash: teacherPassword,
      role: 'teacher',
    },
  });

  // Classes
  const class5A = await prisma.class.create({
    data: {
      name: 'Grade 5A',
      grade: '5',
      teacherId: teacher.id,
    },
  });

  const class5B = await prisma.class.create({
    data: {
      name: 'Grade 5B',
      grade: '5',
    },
  });

  // Parents
  const parent1 = await prisma.parent.create({
    data: {
      fullName: 'Michael Smith',
      phone: '+1234567890',
      email: 'michael.smith@example.com',
    },
  });

  const parent2 = await prisma.parent.create({
    data: {
      fullName: 'Sarah Johnson',
      phone: '+0987654321',
      email: 'sarah.j@example.com',
    },
  });

  // Students
  const student1 = await prisma.student.create({
    data: {
      admissionNo: 'S001',
      surname: 'Smith',
      firstName: 'Emma',
      dateOfBirth: new Date('2012-05-10'),
      gender: 'female',
      nationality: 'American',
      classId: class5A.id,
      parentId: parent1.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      admissionNo: 'S002',
      surname: 'Smith',
      firstName: 'Liam',
      dateOfBirth: new Date('2014-08-22'),
      gender: 'male',
      nationality: 'American',
      classId: class5A.id,
      parentId: parent1.id,
    },
  });

  const student3 = await prisma.student.create({
    data: {
      admissionNo: 'S003',
      surname: 'Johnson',
      firstName: 'Sophia',
      dateOfBirth: new Date('2013-02-14'),
      gender: 'female',
      nationality: 'British',
      classId: class5B.id,
      parentId: parent2.id,
    },
  });

  // Attendance for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.attendance.createMany({
    data: [
      {
        studentId: student1.id,
        classId: class5A.id,
        date: today,
        status: 'present',
        markedById: teacher.id,
      },
      {
        studentId: student2.id,
        classId: class5A.id,
        date: today,
        status: 'absent',
        markedById: teacher.id,
      },
      {
        studentId: student3.id,
        classId: class5B.id,
        date: today,
        status: 'late',
        markedById: teacher.id,
      },
    ],
  });

  // Notification for absent student
  await prisma.notification.create({
    data: {
      parentId: parent1.id,
      studentId: student2.id,
      type: 'absent',
      message: 'Liam was marked absent today.',
      sentAt: new Date(),
    },
  });

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });