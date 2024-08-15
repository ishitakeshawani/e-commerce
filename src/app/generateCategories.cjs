// scripts/generateCategories.cjs
const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function generateCategories() {
  const categories = Array.from({ length: 100 }).map(() => ({
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  }));

  try {
    await prisma.category.createMany({ data: categories });
    console.log('Categories inserted successfully');
  } catch (error) {
    console.error('Error inserting categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

generateCategories();
