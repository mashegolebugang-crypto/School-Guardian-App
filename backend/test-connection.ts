import 'dotenv/config';
console.log('DATABASE_URL:', process.env.DATABASE_URL); 
import { PrismaClient } from '@prisma/client';

async function testConnection() {
  console.log("Attempting to create Prisma Client...");
  const prisma = new PrismaClient();
  console.log("✅ Prisma Client created.");

  console.log("Attempting to connect to the database...");
  await prisma.$connect();
  console.log("✅ Database connected successfully.");

  await prisma.$disconnect();
}

testConnection().catch((error) => {
  console.error("❌ Test failed with error:", error);
});