import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectRecipeById, updateRecipe, deleteRecipe } from "./recipesSlice";
import { AddItemInput } from "../shared/AddItemInput";
import { BackButtonHeader } from "./BackButtonHeader";

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
      dispatch(updateRecipe({ id: recipeId, name, ingredients, steps }));
      history.push(`/recipes/${recipeId}`);
    }
  };

  const onDeleteRecipeClicked = () => {
    dispatch(deleteRecipe(recipeId));
    history.push(`/recipes`);
  };

  const replaceInArray = (arr, updatedIndex, updatedValue) => {
    const obj = {
      ...arr[updatedIndex],
      text: updatedValue,
    };
    return [
      ...arr.slice(0, updatedIndex),
      obj,
      ...arr.slice(updatedIndex + 1, arr.length),
    ];
  };

  const updateIngredientText = (updatedIndex, updatedValue) => {
    setIngredients(replaceInArray(ingredients, updatedIndex, updatedValue));
  };

  const updateStepText = (updatedIndex, updatedValue) => {
    setSteps(replaceInArray(steps, updatedIndex, updatedValue));
  };

  const onAddIngredientToRecipeClicked = (text) => {
    setIngredients(ingredients.concat({ text: text }));
  };

  const onAddStepToRecipeClicked = (text) => {
    setSteps(steps.concat({ text: text }));
  };

  const renderedIngredients = ingredients.map((ingredient, index) => {
    return (
      <li key={index}>
        <input
          type="text"
          name="recipeName"
          placeholder="1 tomato"
          value={ingredient.text}
          onChange={(e) => updateIngredientText(index, e.target.value)}
        />
      </li>
    );
  });

  const renderedSteps = steps.map((step, index) => {
    return (
      <li key={index}>
        <textarea
          value={step.text}
          onChange={(e) => updateStepText(index, e.target.value)}
        ></textarea>
      </li>
    );
  });

  return (
    <section>
      <BackButtonHeader text={"Edit Recipe"} />
      <form>
        <h3>Recipe Name:</h3>
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></textarea>
        <h3>Ingredients</h3>
        <ul>{renderedIngredients}</ul>
        <AddItemInput
          buttonText="Add ingredient"
          placeHolderText="1 tomato"
          onAddItemCallback={onAddIngredientToRecipeClicked}
        />
        <h3>Steps</h3>
        <ol>{renderedSteps}</ol>
        <AddItemInput
          buttonText="Add step"
          placeHolderText="Boil the eggs for..."
          elementType="textarea"
          onAddItemCallback={onAddStepToRecipeClicked}
        />
      </form>
      <button type="button" onClick={onSaveRecipeClicked}>
        Save Recipe
      </button>
      <button type="button" onClick={onDeleteRecipeClicked}>
        Delete Recipe
      </button>
    </section>
  );
};
