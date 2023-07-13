import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: []
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loadCategory: (state, action) => {
      state.category = initialState;
    },

    addCategory: (state, action) => {
      if (!action?.payload) return;
      const input = action.payload;
      if (state.category.includes(input)) return;
      state.category = [... state.category, input];
    },

    updateCategory: (state, action) => {
      const { target, input } = action?.payload;
      if(!target || !input) return;
      if (!state.category.includes(target) || state.category.includes(input)) return;
      state.category = state.category.map((cat) => {
        return (cat == target) ? input : cat;
      });
    },

    deleteCategory: (state, action) => {
      if (!action?.payload) return;
      const target = action.payload;
      if (!state.category.includes(target)) return;
      state.category = state.category.filter((cat) => cat !== target);
    }
  }
});

export { categoriesSlice };
export const { loadCategory, addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;

export const readCategories = (state) => state.categories.category;

export default categoriesSlice.reducer;