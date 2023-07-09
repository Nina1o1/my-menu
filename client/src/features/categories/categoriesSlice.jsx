const initialState = {
  categoties: []
}

function categoriesSlice (state = initialState, action) {
  switch(action.type) {

    case "category/addCategory" : {
      const inputCat = action.payload;
      if (state.categoties.includes(inputCat)) return state;
      return {
        ...state,
        categoties : [... state.categoties, inputCat]
      }
    }

    case "category/updateCategory" : {
      const targetCat = action.payload?.["target"];
      const inputCat = action.payload?.["input"];
      return {
        ...state,
        categoties : state.categoties.map((cat) => (cat === targetCat) ? inputCat : cat)
      }
    }

    case "category/deleteCategory" : {
      const inputCat = action.payload;
      return { 
        ...state, 
        categoties : state.categoties.filter((cat) => cat !== inputCat)
      };
    }
    
    default : 
      return state;
  }
}

export default categoriesSlice;