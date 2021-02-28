import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchShoppingList,
  selectShoppingListItemById,
  selectShoppingListItemIds,
} from "./shoppingListSlice";

const ShoppingListItem = ({ itemId }) => {
  const item = useSelector((state) =>
    selectShoppingListItemById(state, itemId)
  );
  return <li>{item.text}</li>;
};

export const ShoppingList = () => {
  const dispatch = useDispatch();

  const itemIds = useSelector(selectShoppingListItemIds);
  const shoppingListStatus = useSelector((state) => state.shoppingList.status);
  const error = useSelector((state) => state.shoppingList.error);

  useEffect(() => {
    if (shoppingListStatus === "idle") {
      dispatch(fetchShoppingList());
    }
  }, [shoppingListStatus, dispatch]);

  let content;
  if (shoppingListStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (shoppingListStatus === "succeeded") {
    content = itemIds.map((itemId) => {
      return (
        <ul key={itemId}>
          <ShoppingListItem itemId={itemId} />
        </ul>
      );
    });
  } else if (shoppingListStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Shopping List</h2>
      {content}
    </section>
  );
};
