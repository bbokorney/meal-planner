import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectRecipeById, updateRecipe, deleteRecipe } from "./recipesSlice";
import { AddItemInput } from "../shared/AddItemInput";
import { BackButtonHeader } from "./BackButtonHeader";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { BOTTOM_BAR_HEIGHT } from "../../app/constants";

const useStyles = makeStyles((theme) => ({
  anchorOriginBottomLeft: {
    bottom: theme.spacing(BOTTOM_BAR_HEIGHT),
  },
}));

export const EditRecipeForm = ({ match }) => {
  const { recipeId } = match.params;
  const recipe = useSelector((state) => selectRecipeById(state, recipeId));

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState(recipe.name);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [steps, setSteps] = useState(recipe.steps);

  const classes = useStyles();

  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
  };

  const onSaveRecipeClicked = () => {
    if (name && ingredients.length > 0 && steps.length > 0) {
      dispatch(updateRecipe({ id: recipeId, name, ingredients, steps }));
      setSnackBarOpen(true);
    }
  };

  const onDeleteRecipeClicked = () => {
    // TODO: prompt for confirmation
    // Snackbar after delete confirmed
    // Global snackbar?
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
        <TextField
          value={ingredient.text}
          style={{ margin: 8 }}
          placeholder="1 tomato"
          fullWidth
          margin="normal"
          onChange={(e) => updateIngredientText(index, e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </li>
    );
  });

  const renderedSteps = steps.map((step, index) => {
    return (
      <li key={index}>
        <TextField
          value={step.text}
          onChange={(e) => updateStepText(index, e.target.value)}
          style={{ margin: 8 }}
          placeholder="1 tomato"
          fullWidth
          multiline
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </li>
    );
  });

  return (
    <section>
      <BackButtonHeader text={"Edit Recipe"} />
      <form>
        <TextField
          label="Recipe name"
          value={name}
          style={{ margin: 8 }}
          placeholder="Tasty tofu tacos"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <h4>Ingredients</h4>
        <ul>{renderedIngredients}</ul>
        <AddItemInput
          buttonText="Add ingredient"
          placeHolderText="1 tomato"
          fullWidth
          onAddItemCallback={onAddIngredientToRecipeClicked}
        />
        <h4>Steps</h4>
        <ol>{renderedSteps}</ol>
        <AddItemInput
          buttonText="Add step"
          placeHolderText="Boil the eggs for..."
          multiline
          fullWidth
          onAddItemCallback={onAddStepToRecipeClicked}
        />
      </form>
      <IconButton aria-label="save" onClick={onSaveRecipeClicked}>
        <SaveIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={onDeleteRecipeClicked}>
        <DeleteIcon />
      </IconButton>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        classes={classes}
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message="Recipe saved"
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
    </section>
  );
};
