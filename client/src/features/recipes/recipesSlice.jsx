import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const recipesSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    loadRecipe: (state, action) => {
      return [...state, action.payload];
    },

    resetRecipe: (state) => {
      return initialState;
    },
    
    addRecipe: (state, action) => {

    },

    updateRecipe: (state, action) => {

    },

    deleteRecipe: (state, action) => {

    }
  }
});

export { recipesSlice };
export const { loadRecipe, resetRecipe, addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;

const readRecipes =  (state)  => {
  const currRecipes = state?.recipes.map(ele => {
    return {
      dishname: ele["dishname"],
      ingredients: ele["ingredients"]
    }
  })
  return currRecipes;
}

export { readRecipes };
export default recipesSlice.reducer;