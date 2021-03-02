module.exports = {
  name: "Skeeter",
  recipes: {
    create: [
      {
        name: "Boiled water",
        ingredients: {
          create: [
            {
              text: "3 cups of water",
            },
          ],
        },
        steps: {
          create: [
            {
              text: "Pour water into pot.",
            },
            {
              text: "Turn heat on burner to high.",
            },
            {
              text: "Wait for water to boil.",
            },
          ],
        },
      },
      {
        name: "Peanut butter and jelly sandwich",
        ingredients: {
          create: [
            {
              text: "2 slices of bread",
            },
            {
              text: "3 tbsp of peanut butter",
            },
            {
              text: "3 tbsp of jelly",
            },
          ],
        },
        steps: {
          create: [
            {
              text: "Spread peanut butter on one slice of bread.",
            },
            {
              text: "Spread jelly on other slice of bread.",
            },
            {
              text:
                "Place peanut butter slice (butter down) to jelly slice (jelly up).",
            },
          ],
        },
      },
    ],
  },
};
