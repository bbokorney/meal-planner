import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRecipeById, updateRecipe } from "./recipesSlice";
import { useHistory } from "react-router-dom";

export const EditRecipeForm = ({ match }) => {
  const { recipeId } = match.params;
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [steps, setSteps] = useState(recipe.steps);

  const onSaveRecipeClicked = () => {
    if (name && ingredients.length > 0 && steps.length > 0) {
      console.log(name, ingredients, steps);
      dispatch(updateRecipe({ id: recipeId, name, ingredients, steps }));
      history.push(`/recipes/${recipeId}`);
    }
  };

  const replaceInArray = (arr, updatedIndex, updatedValue) => {
    return [
      ...arr.slice(0, updatedIndex),
      updatedValue,
      ...arr.slice(updatedIndex + 1, arr.length),
    ];
  };

  const updateIngredientText = (updatedIndex, updatedValue) => {
    setIngredients(replaceInArray(ingredients, updatedIndex, updatedValue));
  };

  const updateStepText = (updatedIndex, updatedValue) => {
    setSteps(replaceInArray(steps, updatedIndex, updatedValue));
  };

  const renderedIngredients = ingredients.map((ingredient, index) => {
    return (
      <li key={index}>
        <input
          type="text"
          name="recipeName"
          placeholder="1 tomato"
          value={ingredient}
          onChange={(e) => updateIngredientText(index, e.target.value)}
        />
      </li>
    );
  });

  const renderedSteps = steps.map((step, index) => {
    return (
      <li key={index}>
        <textarea
          value={step}
          onChange={(e) => updateStepText(index, e.target.value)}
        ></textarea>
      </li>
    );
  });

  return (
    <section>
      <h2>Edit Recipe</h2>

      <form>
        <h3>Recipe Name:</h3>
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></textarea>
        <h3>Ingredients</h3>
        <ul>{renderedIngredients}</ul>
        <h3>Steps</h3>
        <ol>{renderedSteps}</ol>
      </form>
      <button type="button" onClick={onSaveRecipeClicked}>
        Save Recipe
      </button>
    </section>
  );
};
