import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecipeById } from "./recipesSlice";
import { AddIngredientsToShoppingList } from "./AddIngredientsToShoppingList";

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
      <h2>{recipe.name}</h2>
      <AddIngredientsToShoppingList recipeId={recipe.id} />
      <Link to={`/editRecipe/${recipe.id}`}>Edit Recipe</Link>
      <h3>Ingredients</h3>
      <ul>{ingredients}</ul>
      <h3>Steps</h3>
      <ol>{steps}</ol>
    </article>
  );
};
