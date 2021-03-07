import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipeById } from "./recipesSlice";
import { addIngredientsToShoppingList } from "../shopping-list/shoppingListSlice";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import Button from "@material-ui/core/Button";

export const AddIngredientsToShoppingList = ({ recipeId }) => {
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));
  const ingredients = recipe.ingredients;

  const dispatch = useDispatch();
  const history = useHistory();

  const onAddIngredientsToShoppingListClicked = () => {
    const ingredientsText = ingredients.map((ingredient) => ingredient.text);
    dispatch(addIngredientsToShoppingList(ingredientsText));
    history.push(`/shopping-list`);
  };

  return (
    <Button on>
      <LowPriorityIcon onClick={onAddIngredientsToShoppingListClicked} />
    </Button>
  );
};
