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

const port = 4000;
app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
