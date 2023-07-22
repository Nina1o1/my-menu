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
      const input = action.payload?.["category"];
      if (!input) return;
      const currState = current(state);
      if (currState.includes(input)) return currState;
      return [... currState, input];
    },

    // updateCategory: (state, action) => {
    //   const { target, input } = action?.payload;
    //   if(!target || !input) return;
    //   if (!state.includes(target) || state.includes(input)) return;
    //   state = state.map((cat) => {
    //     return (cat == target) ? input : cat;
    //   });
    // },

    // deleteCategory: (state, action) => {
    //   const target = action.payload;
    //   if (!target) return;
    //   if (!state.includes(target)) return;
    //   state = state.filter((cat) => cat !== target);
    // }
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