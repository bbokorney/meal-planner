import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import Client from "../../api/client";

const client = new Client();

const shoppingListAdapter = createEntityAdapter();

const initialState = shoppingListAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchShoppingList = createAsyncThunk(
  "shoppingList/fetchShoppingList",
  async () => {
    const response = await client.getShoppingList();
    return response;
  }
);

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchShoppingList.pending]: (state) => {
      state.status = "loading";
    },

    [fetchShoppingList.fulfilled]: (state, action) => {
      state.status = "succeeded";
      shoppingListAdapter.upsertMany(state, action.payload);
    },

    [fetchShoppingList.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  selectAll: getShoppingList,
  selectById: selectShoppingListItemById,
  selectIds: selectShoppingListItemIds,
} = shoppingListAdapter.getSelectors((state) => state.shoppingList);

export default shoppingListSlice.reducer;
