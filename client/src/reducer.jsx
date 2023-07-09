import { combineReducers } from "redux";
import categoriesSlice from "./features/categories/categoriesSlice";
import recipesSlice from "./features/recipes/recipesSlice";

// TODO: Add preloaded state as initial data;
const rootReducer = combineReducers({
  categories: categoriesSlice,
  recipes: recipesSlice
});

export default rootReducer;