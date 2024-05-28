import { PrismaClient } from "@prisma/client";
import { departments } from "./departments";

const prisma = new PrismaClient();

async function main() {
  const hasDepartments = await prisma.department.findFirst();
  if (hasDepartments) return;

  for (const department of departments) {
    await prisma.department.create({
      data: department
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
