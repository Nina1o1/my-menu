import { createSlice, createSelector, current } from '@reduxjs/toolkit';

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
      const inputRecipe = action?.payload?.["recipe"];
      if (!inputRecipe) return current(state);
      return [...current(state), inputRecipe];
    },

    updateRecipe: (state, action) => {
      const inputRecipe = action?.payload?.["recipe"];
      if (!inputRecipe) return current(state);
      const findAndUpdateRecipe = current(state).map(recipe => {
        if(recipe["_id"] === inputRecipe["_id"]) {
          return {
            _id: inputRecipe["_id"],
            categories: inputRecipe["categories"],
            dishname: inputRecipe["dishname"],
            ingredients: inputRecipe["ingredients"].map(ingdt => ingdt["item"])
          }
        }
        return recipe;
      });
      return findAndUpdateRecipe;
    },

    deleteRecipe: (state, action) => {
      const inputRecipe = action?.payload;
      if (!inputRecipe) return current(state);
      const findAndDeleteRecipe = current(state).filter(recipe => {
        return recipe["_id"] !== inputRecipe["_id"];
      });
      return findAndDeleteRecipe;
    }
  }
});

export { recipesSlice };
export const { loadRecipe, resetRecipe, addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;

const readRecipes =  (state, inputText, ...categories)  => {
  const foundRecipes = [];

  // check if input is found in ingredient or recipe
  state.recipes.forEach(recipe => {
    if (!inputText && !categories.length) {
      foundRecipes.push(recipe);
      return;
    }
    if(inputText) {
      const searchStr =  `${recipe["dishname"]} ${recipe["ingredients"].join(" ")}`;
      const inputArr = inputText.split(" ");
      inputArr.every(input => {
        if(searchStr.includes(input)) {
          foundRecipes.push(recipe);
          return false;
        }
        return true;
      });
    }
    if(categories.length) {
      categories.every(cat => {
        if(recipe["categories"].includes(cat)) {
          foundRecipes.push(recipe);
          return false;
        }
        return true;
      });
    }
  });
  return foundRecipes;
}

const readFolderRecipes =  (state, category, number)  => {
  const foundRecipes = [];

  // check if input is found in ingredient or recipe
  if (!category) return foundRecipes;
  state.recipes.every(recipe => {
    if (recipe["categories"].includes(category)) {
      foundRecipes.push(recipe);
      if (foundRecipes.length === number) return false;
    }
    return true;
  });
  return foundRecipes;
}


const selectRecipe = createSelector([readRecipes], (foundRecipes) => {
  return foundRecipes;
});

const selectFolderRecipe = createSelector([readFolderRecipes], (foundRecipes) => {
  return foundRecipes;
});

export {selectRecipe, selectFolderRecipe};
export default recipesSlice.reducer;