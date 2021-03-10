import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { RecipesList } from "./features/recipes/RecipesList";
import { SingleRecipe } from "./features/recipes/SingleRecipe";
import { EditRecipeForm } from "./features/recipes/EditRecipeForm";
import { ShoppingList } from "./features/shopping-list/ShoppingList";
import { BottomNavBar } from "./app/BottomNavBar";
import { TopAppBar } from "./app/TopAppBar";
import { Settings } from "./features/settings/Settings";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { BOTTOM_BAR_HEIGHT } from "./app/constants";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  root: {
    marginBottom: theme.spacing(BOTTOM_BAR_HEIGHT + 2),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <CssBaseline />
      <TopAppBar />
      <div className={classes.offset} />
      <Container classes={classes}>
        <Switch>
          <Route exact path="/" component={RecipesList} />
          <Route exact path="/recipes" component={RecipesList} />
          <Route exact path="/shopping-list" component={ShoppingList} />
          <Route exact path="/recipes/:recipeId" component={SingleRecipe} />
          <Route
            exact
            path="/editRecipe/:recipeId"
            component={EditRecipeForm}
          />
          <Route exact path="/settings" component={Settings} />
          <Redirect to="/" />
        </Switch>
      </Container>
      <BottomNavBar />
    </Router>
  );
}

export default App;
