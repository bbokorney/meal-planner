import React from "react";
import { useDispatch } from "react-redux";
import { addIngredientsToShoppingList } from "../shopping-list/shoppingListSlice";
import { AddItemInput } from "../shared/AddItemInput";

export const AddShoppingListItem = () => {
  const dispatch = useDispatch();

  const onAddIngredientsToShoppingListClicked = (text) => {
    dispatch(addIngredientsToShoppingList([text]));
  };

  return (
    <AddItemInput
      buttonText="Add item"
      placeHolderText="1 tomato"
      onAddItemCallback={onAddIngredientsToShoppingListClicked}
    />
  );
};
