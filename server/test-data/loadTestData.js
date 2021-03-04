const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const sampleData = require("./sampleData");

async function main() {
  await prisma.user.create({
    data: sampleData.users,
  });

    sampleData.shoppingList.forEach( async (item) => {
      await prisma.shoppingList.create({
          data: item
      });
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

const shoppingList = await prisma.shoppingList.findMany({
});

  console.dir(shoppingList, { depth: null });

}

main()
  .catch((e) => {
    throw e;
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
