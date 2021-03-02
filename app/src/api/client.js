import axios from "axios";

class client {
  constructor() {
    this.c = axios.create({
      baseURL: "/api/v1",
      timeout: 10000,
    });
  }

  async allRecipes() {
    const resp = await this.c.get("recipes");
    return resp.data;
  }

  async updateRecipe(recipe) {
    const resp = await this.c.put(`recipes/${recipe.id}`, recipe);
    return resp.data;
  }

  async deleteRecipe(id) {
    const resp = await this.c.delete(`recipes/${id}`);
    return resp.data;
  }

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
