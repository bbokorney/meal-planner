const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const skeeter = await prisma.user.create({
    data: {
      name: "Skeeter",
    },
  });

  await prisma.recipe.create({
    data: {
      name: "Boiled water",
      authorId: skeeter.id,
    },
  });

  const selected = await prisma.user.findMany({
    include: {
      recipes: true,
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
