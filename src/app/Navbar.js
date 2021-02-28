import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Meal Planner</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/recipes">Recipes</Link>
            <Link to="/shopping-list">Shopping List</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
