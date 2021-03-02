const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const sampleData = require("./sampleData");

async function main() {
  await prisma.user.create({
    data: sampleData,
  });

  const selected = await prisma.user.findMany({
    include: {
      recipes: {
        include: {
          ingredients: true,
          steps: true,
        },
      },
    },
  });

  console.dir(selected, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
