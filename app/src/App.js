import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { RecipesList } from "./features/recipes/RecipesList";
import { SingleRecipe } from "./features/recipes/SingleRecipe";
import { EditRecipeForm } from "./features/recipes/EditRecipeForm";
import { ShoppingList } from "./features/shopping-list/ShoppingList";
import "./App.css";

function App() {
  return (
    <Router>
      <h1>Meal Planner</h1>
      <Navbar />
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
        <Route exact path="/shopping-list" component={ShoppingList} />
        <Route exact path="/recipes/:recipeId" component={SingleRecipe} />
        <Route exact path="/editRecipe/:recipeId" component={EditRecipeForm} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
