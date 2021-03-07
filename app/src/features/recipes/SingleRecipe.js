import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecipeById } from "./recipesSlice";
import { AddIngredientsToShoppingList } from "./AddIngredientsToShoppingList";
import { BackButtonHeader } from "./BackButtonHeader";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

export const SingleRecipe = ({ match }) => {
  const { recipeId } = match.params;
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));

  const ingredients = recipe.ingredients.map((ingredient, index) => {
    return <li key={index}>{ingredient.text}</li>;
  });

  const steps = recipe.steps.map((step, index) => {
    return <li key={index}>{step.text}</li>;
  });

  return (
    <article>
      <BackButtonHeader text={recipe.name} />
      <AddIngredientsToShoppingList recipeId={recipe.id} />
      <Button component={Link} to={`/editRecipe/${recipe.id}`}>
        <EditIcon />
      </Button>
      <h3>Ingredients</h3>
      <ul>{ingredients}</ul>
      <h3>Steps</h3>
      <ol>{steps}</ol>
    </article>
  );
};
