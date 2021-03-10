import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecipeById } from "./recipesSlice";
import { AddIngredientsToShoppingList } from "./AddIngredientsToShoppingList";
import { BackButtonHeader } from "./BackButtonHeader";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { BOTTOM_BAR_HEIGHT } from "../../app/constants";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  anchorOriginBottomLeft: {
    bottom: theme.spacing(BOTTOM_BAR_HEIGHT),
  },
}));

export const SingleRecipe = ({ match }) => {
  const { recipeId } = match.params;
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));

  const classes = useStyles();

  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleAddIngredientsClick = () => {
    setSnackBarOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const ingredients = recipe.ingredients.map((ingredient, index) => {
    return (
      <Typography variant="body2" key={index} gutterBottom>
        {ingredient.text}
      </Typography>
    );
  });

  const steps = recipe.steps.map((step, index) => {
    return (
      <Typography variant="body2" key={index} gutterBottom>
        {step.text}
      </Typography>
    );
  });

  return (
    <article>
      <BackButtonHeader text={recipe.name} />
      <AddIngredientsToShoppingList
        recipeId={recipe.id}
        onClick={handleAddIngredientsClick}
      />
      <Button component={Link} to={`/editRecipe/${recipe.id}`}>
        <EditIcon />
      </Button>
      <h3>Ingredients</h3>
      {ingredients}
      <h3>Steps</h3>
      {steps}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={classes}
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message="Ingredients added to shopping list"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </article>
  );
};
