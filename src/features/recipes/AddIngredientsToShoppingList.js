import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipeById } from "./recipesSlice";
import { addIngredientsToShoppingList } from "../shopping-list/shoppingListSlice";

export const AddIngredientsToShoppingList = ({ recipeId }) => {
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));
  const ingredients = recipe.ingredients;

  const dispatch = useDispatch();
  const history = useHistory();

  const onAddIngredientsToShoppingListClicked = () => {
    dispatch(addIngredientsToShoppingList(ingredients));
    history.push(`/shopping-list`);
  };

  return (
    <button type="button" onClick={onAddIngredientsToShoppingListClicked}>
      Add Ingredients To Shopping List
    </button>
  );
};
