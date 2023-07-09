const initialState = {
  categoties: []
}

function categoriesSlice (state = initialState, action) {
  switch(action.type) {

    case "category/addCategory" : {
      const input = action.payload;
      if (state.categoties.includes(input)) return state;
      return {
        ...state,
        categoties : [... state.categoties, input]
      }
    }

    case "category/updateCategory" : {
      const target = action.payload?.["target"];
      const input = action.payload?.["input"];
      return {
        ...state,
        categoties : state.categoties.map((cat) => (cat === target) ? input : cat)
      }
    }

    case "category/deleteCategory" : {
      const target = action.payload;
      return { 
        ...state, 
        categoties : state.categoties.filter((cat) => cat !== target)
      };
    }
    
    default : 
      return state;
  }
}

export default categoriesSlice;