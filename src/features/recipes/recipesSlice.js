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

export const updateRecipe = createAsyncThunk(
  "posts/updateRecipe",
  async (recipe) => {
    const response = await client.updateRecipe(recipe);
    return response;
  }
);

export const deleteRecipe = createAsyncThunk(
  "posts/deleteRecipe",
  async (recipeId) => {
    await client.deleteRecipe(recipeId);
    return recipeId;
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

    [updateRecipe.fulfilled]: recipesAdapter.upsertOne,

    [deleteRecipe.fulfilled]: recipesAdapter.removeOne,
  },
});

export const {
  selectAll: selectAllRecipes,
  selectById: selectRecipeById,
  selectIds: selectRecipeIds,
} = recipesAdapter.getSelectors((state) => state.recipes);

export default recipesSlice.reducer;
