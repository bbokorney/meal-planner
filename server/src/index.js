const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const express = require("express");

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany({});
  console.dir(users);
  res.json(users);
});

const port = 4000;
app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
