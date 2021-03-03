import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../features/recipes/recipesSlice";
import shoppingListReducer from "../features/shopping-list/shoppingListSlice";

export default configureStore({
  reducer: {
    recipes: recipesReducer,
    shoppingList: shoppingListReducer,
  },
});
