import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addIngredientsToShoppingList } from "../shopping-list/shoppingListSlice";

export const AddShoppingListItem = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const onAddIngredientsToShoppingListClicked = () => {
    dispatch(addIngredientsToShoppingList([text]));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="1 tomato"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="button" onClick={onAddIngredientsToShoppingListClicked}>
        Add ingredient
      </button>
    </div>
  );
};
