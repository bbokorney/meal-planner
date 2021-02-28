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
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <RecipesList />
            </React.Fragment>
          )}
        />
        <Route exact path="/recipes/:recipeId" component={SingleRecipe} />
        <Route exact path="/editRecipe/:recipeId" component={EditRecipeForm} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
