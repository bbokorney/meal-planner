const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const express = require("express");

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

const prefix = "/api/v1";

app.get(`${prefix}/recipes`, async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      steps: true,
    },
  });
  console.dir(recipes, { depth: null });
  res.json(recipes);
});

app.delete(`${prefix}/recipes/:id`, async (req, res) => {
  const id = parseInt(req.params.id);

  const deleteSteps = prisma.step.deleteMany({
    where: {
      recipeId: id,
    },
  });

  const deleteIngredients = prisma.ingredient.deleteMany({
    where: {
      recipeId: id,
    },
  });

  const deleteRecipe = prisma.recipe.delete({
    where: {
      id: id,
    },
  });

  const transaction = await prisma.$transaction([
    deleteSteps,
    deleteIngredients,
    deleteRecipe,
  ]);

  console.dir(transaction, { depth: null });

  res.json(transaction);
});

const port = 4000;
app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
