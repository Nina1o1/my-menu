import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from '@reduxjs/toolkit';
const initialState = [];

const recipesSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    loadRecipe: (state, action) => {
      const filterRecipes = action.payload.map(recipe => {
        return {
          _id: recipe["_id"],
          categories: recipe["categories"],
          dishname: recipe["dishname"],
          ingredients: recipe["ingredients"].map(ingdt => ingdt["item"])
        };
      });
      return filterRecipes;
    },

    resetRecipe: () => {
      return initialState;
    },
    
    addRecipe: (state, action) => {
      return [...state, action.payload];
    },

    updateRecipe: (state, action) => {

    },

    deleteRecipe: (state, action) => {

    }
  }
});

export { recipesSlice };
export const { loadRecipe, resetRecipe, addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;

const readRecipes =  (state, inputText, categories)  => {
  const currRecipes = [];
  
  state.recipes.forEach(recipe => {
    let isFound = true;
    // check if input is found in ingredient or recipe
    if(inputText) {
      isFound = false;
      const searchStr =  `${recipe["dishname"]} ${recipe["ingredients"].join(" ")}`;
      const inputArr = inputText.split(" ");
      inputArr.every(input => {
        if(searchStr.includes(input)) {
          isFound = true;
          return false;
        }
        return true;
      });
    }
    // TODO: check category
    if(!isFound) return;
    currRecipes.push(recipe);
  });

  return currRecipes;
}

const recipeDictionary = createSelector([readRecipes], (foundRecipes, inputText) => {
  return foundRecipes;
});

export { readRecipes, recipeDictionary};
export default recipesSlice.reducer;