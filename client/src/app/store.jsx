import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categoriesSlice";
import recipesReducer from "../features/recipesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    recipes: recipesReducer
  }
});

export default store;