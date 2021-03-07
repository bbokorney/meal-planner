import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecipes,
  selectRecipeById,
  selectRecipeIds,
} from "./recipesSlice";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    position: "fixed",
    bottom: "56px", // TODO: hardcoded relative to bottom bar
    right: theme.spacing(1),
  },
}));

const RecipeExcerpt = ({ recipeId }) => {
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));

  return (
    <Box display="flex" alignItems="center" marginTop="10px">
      <Box display="flex" justifyContent="left" width="100%">
        <b>{recipe.name}</b>
      </Box>
      <Button variant="contained" component={Link} to={`/recipes/${recipe.id}`}>
        <KeyboardArrowRightIcon />
      </Button>
    </Box>
  );
};

export const RecipesList = () => {
  const dispatch = useDispatch();

  const recipeIds = useSelector(selectRecipeIds);
  const recipesStatus = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  const classes = useStyles();

  useEffect(() => {
    if (recipesStatus === "idle") {
      dispatch(fetchRecipes());
    }
  }, [recipesStatus, dispatch]);

  let content;
  if (recipesStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (recipesStatus === "succeeded") {
    const excerpts = recipeIds.map((recipeId) => {
      return <RecipeExcerpt key={recipeId} recipeId={recipeId} />;
    });
    content = (
      <div>
        {excerpts}
        <Fab color="primary" aria-label="add" classes={classes}>
          <AddIcon />
        </Fab>
      </div>
    );
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
