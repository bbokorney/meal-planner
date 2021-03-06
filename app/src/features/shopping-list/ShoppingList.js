import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchShoppingList,
  // selectShoppingListItemById,
  // selectShoppingListItemIds,
  saveShoppingList,
  getShoppingList,
} from "./shoppingListSlice";
import { AddItemInput } from "../shared/AddItemInput";

// const testShoppingList = [
//   {
//     text: "Bag of sands",
//     index: 0,
//     acquired: "no",
//   },
//   {
//     text: "Sack of nuts",
//     index: 1,
//     acquired: "yes",
//   },
//   {
//     text: "Bag of ass",
//     index: 2,
//     acquired: "no",
//   },
// ];

export const ShoppingList = () => {
  const dispatch = useDispatch();

  const shoppingListStatus = useSelector((state) => state.shoppingList.status);
  const error = useSelector((state) => state.shoppingList.error);
  const shoppingList = useSelector(getShoppingList);
  const [newItems, setNewItems] = useState([]);
  const items = shoppingList.concat(newItems);

  const onSaveShoppingListClicked = () => {
    dispatch(saveShoppingList(shoppingList.concat(newItems)));
  };

  const onAddShoppingListItem = (text) => {
    setNewItems(newItems.concat({ text: text, index: 0, acquired: "no" }));
  };

  useEffect(() => {
    if (shoppingListStatus === "idle") {
      dispatch(fetchShoppingList());
    }
  }, [shoppingListStatus, dispatch]);

  let content;
  if (shoppingListStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (shoppingListStatus === "succeeded") {
    const listItems = items.map((item, index) => {
      return <li key={index}> {item.text} </li>;
    });
    content = <ul> {listItems} </ul>;
  } else if (shoppingListStatus === "failed") {
    content = <div>{error}</div>;
  }
  return (
    <section>
      <h2>Shopping List</h2>
      {content}
      <AddItemInput
        buttonText="Add item"
        placeHolderText="1 tomato"
        onAddItemCallback={onAddShoppingListItem}
      />
      <button type="button" onClick={onSaveShoppingListClicked}>
        Save List
      </button>
    </section>
  );
};
