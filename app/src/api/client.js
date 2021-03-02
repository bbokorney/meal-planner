import axios from "axios";

class client {
  constructor() {
    this.c = axios.create({
      baseURL: "/api/v1",
      timeout: 10000,
      // headers: { "X-Auth-Token": token },
    });
  }

  allRecipes = () => {
    return this.c.get("recipes").then((result) => {
      return result.data;
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

  getShoppingList = () => {
    return new Promise((resolve) => {
      resolve([
        {
          id: 0,
          text: "3 eggs",
        },
        {
          id: 1,
          text: "Bag o' sand",
        },
        {
          id: 2,
          text: "300 packets of ramen",
        },
      ]);
    });
  };

  addIngredientsToShoppingList = () => {
    return new Promise((resolve) => {
      resolve();
    });
  };
}

const clientInstance = new client();

const Client = () => {
  return clientInstance;
};

export default Client;
