import { createSlice, createSelector, current } from "@reduxjs/toolkit";

const initialState = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loadCategory: (state, action) => {
      return action.payload;
    },

    resetCategory: () => {
      return initialState;
    },

    addCategory: (state, action) => {
      const input = action.payload;
      const currState = current(state);
      if (!input) return currState;
      if (currState.includes(input)) return currState;
      return [... currState, input];
    },

    updateCategory: (state, action) => {
      const { target, input } = action?.payload;
      const currState = current(state);
      if (!target || !input) return currState;
      if (!currState.includes(target) || currState.includes(input)) return currState;
      const retState = currState.filter(cat => cat!== target);      
      retState.push(input);
      return retState;
    },

    deleteCategory: (state, action) => {
      const target = action.payload;
      const currState = current(state);
      if (!target) return currState;
      if (!currState.includes(target)) return currState;
      return currState.filter((cat) => cat !== target);
    }
  }
});

export { categoriesSlice };
export const { loadCategory, resetCategory, addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

const readCategories = (state) => {
  return state.categories;
}

const selectCategories = createSelector([readCategories], (foundCategories) => {
  return foundCategories;
});

export {selectCategories};
export default categoriesSlice.reducer;