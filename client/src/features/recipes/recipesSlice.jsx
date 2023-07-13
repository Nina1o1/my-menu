import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

// _id
// recipe name
// recipe ingredient

const recipesSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    loadRecipe: (store, action) => {
      store = action.type;
    },
    
    addRecipe: (store, action) => {

    },

    updateRecipe: (store, action) => {

    },

    deleteRecipe: (store, action) => {

    },

    // more
  }
});

export { recipesSlice };
export const { loadRecipe, addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;