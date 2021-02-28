import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecipes,
  selectRecipeById,
  selectRecipeIds,
} from "./recipesSlice";

const RecipeExcerpt = ({ recipeId }) => {
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));

  return (
    <article>
      <h3>{recipe.name}</h3>
      <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
    </article>
  );
};

export const RecipesList = () => {
  const dispatch = useDispatch();

  const recipeIds = useSelector(selectRecipeIds);
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes());
    }
  }, [recipesStatus, dispatch]);

  let content;
  if (recipesStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (recipesStatus === "succeeded") {
    content = recipeIds.map((recipeId) => {
      return <RecipeExcerpt key={recipeId} recipeId={recipeId} />;
    });
  } else if (recipesStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Recipes</h2>
      {content}
    </section>
  );
};
