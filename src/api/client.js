class Client {
  allRecipes = () => {
    return new Promise((resolve) => {
      resolve([
        {
          id: 0,
          name: "Boiled water",
          ingredients: ["3 cups of water"],
          steps: [
            "Pour water into pot.",
            "Turn heat on burner to high.",
            "Wait for water to boil.",
          ],
        },
        {
          id: 1,
          name: "Peanut butter and jelly sandwich",
          ingredients: [
            "2 slices of bread",
            "3 tbsp of peanut butter",
            "3 tbsp of jelly",
          ],
          steps: [
            "Spread peanut butter on one slice of bread.",
            "Spread jelly on other slice of bread.",
            "Place peanut butter slice (butter down) to jelly slice (jelly up).",
          ],
        },
      ]);
    });
  };

  updateRecipe = (recipe) => {
    return new Promise((resolve) => {
      resolve(recipe);
    });
  };

  deleteRecipe = () => {
    return new Promise((resolve) => {
      resolve();
    });
  };
}

export default Client;
