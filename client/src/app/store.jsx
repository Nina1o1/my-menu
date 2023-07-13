import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categoriesSlice";
import recipesReducer from "../features/recipes/recipesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    recipes: recipesReducer
  }
});

export default store;