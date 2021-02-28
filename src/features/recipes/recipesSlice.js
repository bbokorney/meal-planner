import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import Client from "../../api/client";

const client = new Client();

const recipesAdapter = createEntityAdapter();

const initialState = recipesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await client.allRecipes();
    return response;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRecipes.pending]: (state) => {
      state.status = "loading";
    },

    [fetchRecipes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched recipes to the array
      // Use the `upsertMany` reducer as a mutating update utility
      recipesAdapter.upsertMany(state, action.payload);
    },

    [fetchRecipes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  selectAll: selectAllRecipes,
  selectById: selectRecipeById,
  selectIds: selectRecipeIds,
} = recipesAdapter.getSelectors((state) => state.recipes);

export default recipesSlice.reducer;
