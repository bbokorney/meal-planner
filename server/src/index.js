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

app.put(`${prefix}/recipes/:id`, async (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = req.body;
  console.dir(recipe, { depth: null });

  const ingredients = recipe.ingredients.map((ingredient) => {
    // Removing recipeId because it can't be part of upsert
    const { recipeId, ...obj } = ingredient;
    // TODO: just to fix linting
    recipeId + 1;
    return {
      create: { ...obj },
      update: { ...obj },
      // TODO: verify that 0 is not actually used?
      where: { id: ingredient.id ? ingredient.id : 0 },
    };
  });

  const steps = recipe.steps.map((step) => {
    const { recipeId, ...obj } = step;
    // TODO: just to fix linting
    recipeId + 1;
    return {
      create: { ...obj },
      update: { ...obj },
      where: { id: step.id ? step.id : 0 },
    };
  });

  console.dir(steps, { depth: null });
  const updatedRecipe = await prisma.recipe.update({
    where: { id: id },
    data: {
      name: recipe.name,
      ingredients: {
        upsert: ingredients,
      },
      steps: {
        upsert: steps,
      },
    },
  });
  console.dir(updatedRecipe, { depth: null });

  res.json(updatedRecipe);
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
