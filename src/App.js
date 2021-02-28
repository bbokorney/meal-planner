import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { RecipesList } from "./features/recipes/RecipesList";
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
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
